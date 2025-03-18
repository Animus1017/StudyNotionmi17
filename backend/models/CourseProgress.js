const { Schema, model } = require("mongoose");

const courseProgressSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSections",
    },
  ],
});

const courseProgressModel = model("CourseProgress", courseProgressSchema);
module.exports = courseProgressModel;
