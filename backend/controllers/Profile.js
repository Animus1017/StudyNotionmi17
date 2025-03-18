const Profile = require("../models/Profile");
const User = require("../models/User");
const mediaUpload = require("../utils/mediaUploader");
const CourseProgress = require("../models/CourseProgress");
const Courses = require("../models/Courses");
const RatingAndReviews = require("../models/RatingAndReviews");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { convertSecondsToDurationFull } = require("../utils/secToDurationFull");
require("dotenv").config();
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    const profileId = user.additionalDetails;
    const profile = await Profile.findById(profileId);
    if (!profile)
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    // if (dob) profile.dob = dob;
    // if (gender) profile.gender = gender;
    // if (about) profile.about = about;
    // if (phoneNumber) profile.phoneNumber = phoneNumber;
    // if (countryCode) profile.countryCode = countryCode;
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        profile[key] = updates[key];
      }
    }
    await profile.save();
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        user[key] = updates[key];
      }
    }
    await user.save();
    const updatedUser = await user.populate("additionalDetails");
    console.log(updatedUser);

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate("additionalDetails").exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    return res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    await Courses.updateMany(
      { courseStudents: id }, // Match courses where user is enrolled
      { $pull: { courseStudents: id } } // Remove user's ID from courseStudents array
    );
    await CourseProgress.deleteMany({ userId: id }); // Remove user's progress data from course progress collection
    await RatingAndReviews.deleteMany({ user: id }); // Remove user's rating and review data from rating and reviews collection
    await Profile.findByIdAndDelete(user.additionalDetails);
    await User.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    const newPicture = req.files.displayPicture;
    console.log(newPicture);

    if (!newPicture)
      return res.status(400).json({
        success: false,
        message: "No profile picture provided",
      });
    const updatedPicture = await mediaUpload(
      newPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        image: updatedPicture.url,
      },
      { new: true }
    ).populate("additionalDetails");
    return res.json({
      success: true,
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile picture",
      error: error.message,
    });
  }
};
exports.removeProfilePicture = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`,
      },
      { new: true }
    );
    return res.json({
      success: true,
      message: "Profile picture removed successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile picture",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { id } = req.user;
    let user = await User.findById(id)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSections",
          },
        },
      })
      .exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user = user.toObject();
    let subSectionLength = 0;
    for (let i = 0; i < user.courses.length; i++) {
      let totalDurationInSeconds = 0;
      subSectionLength = 0;
      for (let j = 0; j < user.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += user.courses[i].courseContent[
          j
        ].subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        user.courses[i].timeDuration = convertSecondsToDurationFull(
          totalDurationInSeconds
        );
        subSectionLength += user.courses[i].courseContent[j].subSections.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: user.courses[i]._id,
        userId: id,
      });
      console.log(courseProgressCount);
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (subSectionLength === 0) {
        user.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        user.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / subSectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }
    return res.json({
      success: true,
      message: "Enrolled courses fetched successfully",
      enrolledCourses: user.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};
exports.fetchInstructorDashboardData = async (req, res) => {
  try {
    const { id } = req.user;
    const courseDetails = await Courses.find({ courseInstructor: id });
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.courseStudents.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.coursePrice;
      const courseStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseStats;
    });
    return res.json({
      success: true,
      message: "Instructor dashboard data fetched successfully",
      courses: courseData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor dashboard data",
      error: error.message,
    });
  }
};

exports.getStudentDashboardData = async (req, res) => {
  try {
    const { id } = req.user;
    let user = await User.findById(id)
      .populate({
        path: "courses",
        populate: [
          {
            path: "ratingAndReview",
          },
          {
            path: "courseContent",
            populate: {
              path: "subSections",
            },
          },
        ],
      })
      .exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user = user.toObject();
    let subSectionLength = 0;
    for (let i = 0; i < user.courses.length; i++) {
      let totalDurationInSeconds = 0;
      subSectionLength = 0;
      for (let j = 0; j < user.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += user.courses[i].courseContent[
          j
        ].subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        user.courses[i].timeDuration = totalDurationInSeconds;

        subSectionLength += user.courses[i].courseContent[j].subSections.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: user.courses[i]._id,
        userId: id,
      }).populate("completedVideos");
      let courseTimeSpent = courseProgressCount;
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (subSectionLength === 0) {
        user.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        user.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / subSectionLength) * 100 * multiplier
          ) / multiplier;
      }
      if (user.courses[i].progressPercentage === 100) {
        user.courses[i].timeSpent = user.courses[i].timeDuration;
      } else {
        let totalTimeSpent = 0;
        for (let k = 0; k < courseTimeSpent.completedVideos.length; k++) {
          totalTimeSpent += courseTimeSpent.completedVideos[k].timeDuration;
        }
        user.courses[i].timeSpent = totalTimeSpent;
      }
      // console.log(user.courses[i]);
    }
    return res.json({
      success: true,
      message: "Student Dashboard Data fetched successfully",
      enrolledCourses: user.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student dashboard data",
      error: error.message,
    });
  }
};
