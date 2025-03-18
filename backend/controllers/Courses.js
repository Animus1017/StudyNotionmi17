const Courses = require("../models/Courses");
const User = require("../models/User");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSections = require("../models/SubSections");
const CourseProgress = require("../models/CourseProgress");
const mediaUpload = require("../utils/mediaUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      coursePrice,
      courseCategory,
      courseTags: _tag,
      status,
      instructions: _instructions,
      language,
    } = req.body;
    const courseThumbnail = req.files.thumbnailImage;
    const id = req.user.id;
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);
    if (
      !courseName ||
      !courseDescription ||
      !coursePrice ||
      !courseCategory ||
      !courseThumbnail ||
      !whatYouWillLearn ||
      !tag.length ||
      !instructions.length ||
      !language
    )
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    if (!status || status === undefined) status = "Draft";
    const instructorDetails = await User.findById(id, {
      accountType: "Instructor",
    });
    console.log(instructorDetails);
    if (!instructorDetails)
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    const categoryDetails = await Category.findById(courseCategory);
    if (!categoryDetails)
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });

    const thumbnailImage = await mediaUpload(
      courseThumbnail,
      process.env.FOLDER_NAME
    );
    const course = new Courses({
      courseName,
      courseDescription,
      whatYouWillLearn: whatYouWillLearn,
      coursePrice,
      courseThumbnail: thumbnailImage.url,
      courseInstructor: id,
      courseCategory: courseCategory,
      courseTags: tag,
      instructions: instructions,
      status: status,
      language: language,
    });
    await course.save();
    await User.findByIdAndUpdate(
      id,
      {
        $push: { courses: course._id },
      },
      { new: true }
    );
    await Category.findByIdAndUpdate(
      courseCategory,
      {
        $push: { courses: course._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating Course",
      error: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId, courseCategory, ...updates } = req.body; // Destructure courseCategory separately
    const id = req.user.id;

    // Find the course by ID
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the user is authorized to update the course
    if (course.courseInstructor.toString() !== id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this course",
      });
    }

    // Handle thumbnail update if provided
    if (req.files && req.files.thumbnailImage) {
      const courseThumbnail = req.files.thumbnailImage;
      const thumbnailImage = await mediaUpload(
        courseThumbnail,
        process.env.FOLDER_NAME
      );
      course.courseThumbnail = thumbnailImage.url;
    }

    // Update course fields
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "courseTags" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    // Update courseCategory if provided
    if (courseCategory) {
      // Optional: Validate if the category exists (assumes Category is a model)
      const oldCategory = course.courseCategory;
      if (oldCategory) {
        await Category.findByIdAndUpdate(oldCategory, {
          $pull: { courses: course._id },
        });
      }
      const categoryExists = await Category.findById(courseCategory);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }
      course.courseCategory = courseCategory; // Assign new category ID
      await Category.findByIdAndUpdate(courseCategory, {
        $push: { courses: course._id },
      });
    }

    // Save the updated course
    await course.save();

    // Fetch the updated course with populated fields
    const updatedCourse = await Courses.findById(courseId)
      .populate({
        path: "courseInstructor",
        populate: { path: "additionalDetails" },
      })
      .populate("courseCategory") // Ensure category details are populated
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: { path: "subSections" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find(
      { status: "Published" },
      {
        courseName: true,
        coursePrice: true,
        courseThumbnail: true,
        courseInstructor: true,
        ratingAndReview: true,
        courseStudents: true,
      }
    )
      .populate("courseInstructor")
      .exec();
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Courses.findById(courseId)
      .populate({
        path: "courseInstructor",
        populate: { path: "additionalDetails" },
      })
      .populate("courseCategory")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: { path: "subSections" },
      })
      .exec();
    if (!course)
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    let totalDurationInSeconds = 0;
    course.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: {
        course,
        totalDuration,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { id } = req.user;
    const course = await Courses.findById(courseId)
      .populate({
        path: "courseInstructor",
        populate: { path: "additionalDetails" },
      })
      .populate("courseCategory")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: { path: "subSections" },
      })
      .exec();
    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: id,
    });

    if (!course)
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    let totalDurationInSeconds = 0;
    course.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: {
        course,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const { id } = req.user;
    const courses = await Courses.find({ courseInstructor: id })
      .sort({
        createdAt: -1,
      })
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: { path: "subSections" },
      });
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    console.log(req.body.courseId);

    const { courseId } = req.body;
    console.log(courseId);

    const id = req.user.id;

    const course = await Courses.findById(courseId);
    if (!course)
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    if (course.courseInstructor.toString() !== id.toString())
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this course",
      });
    const enrolledStudents = course.courseStudents;
    for (const studentId of enrolledStudents) {
      await User.findByIdAndUpdate(
        studentId,
        {
          $pull: { courses: courseId },
        },
        { new: true }
      );
    }
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSections;
        for (const subSectionId of subSections) {
          await SubSections.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }
    await CourseProgress.deleteMany({ courseId: courseId });
    await Courses.findByIdAndDelete(courseId);
    await User.findByIdAndUpdate(
      id,
      {
        $pull: { courses: courseId },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      course.courseCategory,
      {
        $pull: { courses: courseId },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};
