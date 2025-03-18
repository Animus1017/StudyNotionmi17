const Section = require("../models/Section");
const Courses = require("../models/Courses");
exports.createSection = async (req, res) => {
  try {
    const { courseId, sectionName } = req.body;
    if (!courseId || !sectionName)
      return res.status(400).json({
        success: false,
        message: "Please provide courseId and sectionName",
      });
    const newSection = new Section({
      sectionName: sectionName,
    });
    await newSection.save();
    const updatedCourse = await Courses.findByIdAndUpdate(
      { _id: courseId },
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create section",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName, courseId } = req.body;
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );
    const updatedCourse = await Courses.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update section",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    if (!sectionId || !courseId)
      return res.status(400).json({
        success: false,
        message: "Please provide sectionId and courseId",
      });
    const deletedSection = await Section.findOneAndDelete({ _id: sectionId });
    if (!deletedSection)
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete section",
      error: error.message,
    });
  }
};
