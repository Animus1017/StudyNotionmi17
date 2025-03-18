const RatingAndReviews = require("../models/RatingAndReviews");
const Courses = require("../models/Courses");
const { default: mongoose } = require("mongoose");
exports.createRating = async (req, res) => {
  try {
    const { courseId, rating, review } = req.body;
    const userId = req.user.id;
    const course = await Courses.findOne({
      _id: courseId,
      courseStudents: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "User not enrolled in the course" });
    const existingRating = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (existingRating)
      return res.status(400).json({
        success: false,
        message: "User has already rated this course",
      });
    const newRating = new RatingAndReviews({
      user: userId,
      rating,
      review,
      course: courseId,
    });
    await newRating.save();
    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReview: newRating._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating created successfully",
      course: updatedCourse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;
    const result = RatingAndReviews.accumulate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Average rating retrieved successfully",
        averageRating: result[0].averageRating,
      });
    }
    res.status(404).json({
      success: false,
      message: "No ratings found for this course",
      averageRating: 0,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
exports.getAllRating = async (req, res) => {
  try {
    const ratings = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Ratings retrieved successfully",
      ratings,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
