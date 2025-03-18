const CourseProgress = require("../models/CourseProgress");
const Courses = require("../models/Courses");
const SubSection = require("../models/SubSections");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const { id } = req.user;
    if (!courseId || !subSectionId || !id)
      return res.status(400).json({
        success: false,
        message: "Please provide courseId, subSectionId and userId",
      });
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection)
      return res
        .status(404)
        .json({ success: false, message: "Subsection not found" });
    let courseProgress = await CourseProgress.findOne({
      userId: id,
      courseId: courseId,
    });
    if (!courseProgress)
      return res
        .status(404)
        .json({ success: false, message: "Course progress not found" });
    if (courseProgress.completedVideos.includes(subSectionId))
      return res.status(400).json({
        success: false,
        message: "Lecture already completed",
      });
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();
    res.json({ success: true, message: "Course progress updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update course progress",
      error: error.message,
    });
  }
};
exports.markAllAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { id } = req.user;
    if (!courseId || !id)
      return res.status(400).json({
        success: false,
        message: "Please provide courseId and userId",
      });
    let course = await Courses.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSections" },
    });
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    let courseProgress = await CourseProgress.findOne({
      userId: id,
      courseId: courseId,
    });
    if (!courseProgress)
      return res
        .status(404)
        .json({ success: false, message: "Course progress not found" });
    // console.log(course);
    course = course.toObject();
    course.courseContent.forEach((content) => {
      // console.log(content);

      content.subSections.forEach((subSection) => {
        if (!courseProgress.completedVideos.includes(subSection._id))
          courseProgress.completedVideos.push(subSection._id);
      });
    });
    await courseProgress.save();
    res.json({ success: true, message: "All lectures marked as completed" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark all as completed",
      error: error.message,
    });
  }
};
