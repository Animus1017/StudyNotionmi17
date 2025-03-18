const Section = require("../models/Section");
const SubSections = require("../models/SubSections");
const Courses = require("../models/Courses");
const mediaUpload = require("../utils/mediaUploader");
exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description, courseId } = req.body;
    const videoUrl = req.files.videoFile;
    if (!sectionId || !title || !description || !videoUrl || !courseId)
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    const video = await mediaUpload(videoUrl, process.env.FOLDER_NAME, 10);
    if (!video)
      return res
        .status(400)
        .json({ success: false, message: "Failed to upload video" });
    const subSection = new SubSections({
      title,
      timeDuration: `${video.duration}`,
      description,
      videoUrl: video.url,
    });
    await subSection.save();
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSections: subSection._id } },
      { new: true }
    )
      .populate("subSections")
      .exec();
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    const course = await Courses.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to create subsection",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, courseId } = req.body;
    const subSection = await SubSections.findById(subSectionId);
    if (!subSection)
      return res
        .status(404)
        .json({ success: false, message: "Subsection not found" });
    if (title !== undefined) subSection.title = title;
    if (description !== undefined) subSection.description = description;
    if (req.files && req.files.videoFile !== undefined) {
      const videoUrl = req.files.videoFile;
      const video = await mediaUpload(videoUrl, process.env.FOLDER_NAME, 10);
      subSection.videoUrl = video.url;
      subSection.timeDuration = `${video.duration}`;
    }
    await subSection.save();
    const course = await Courses.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to update subsection",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, courseId } = req.body;
    console.log(subSectionId, sectionId, courseId);

    if (!subSectionId || !sectionId || !courseId)
      return res.status(400).json({
        success: false,
        message: "Please provide subsectionId,courseId and sectionId",
      });
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSections: subSectionId },
      },
      { new: true }
    );
    if (!updatedSection)
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    const deletedSubsection = await SubSections.findByIdAndDelete(subSectionId);
    if (!deletedSubsection)
      return res
        .status(404)
        .json({ success: false, message: "Subsection not found" });

    const course = await Courses.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSections",
      },
    });
    res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to delete subsection",
    });
  }
};
