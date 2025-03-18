const { Schema, model } = require("mongoose");

const coursesSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDescription: {
      type: String,
      required: true,
      trim: true,
    },
    courseInstructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    whatYouWillLearn: {
      type: String,
    },
    courseContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "RatingAndReviews",
      },
    ],
    coursePrice: {
      type: Number,
      required: true,
    },
    courseThumbnail: {
      type: String,
      required: true,
    },
    courseCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    courseTags: {
      type: [String],
      required: true,
    },
    courseStudents: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    instructions: {
      type: [String],
      trim: true,
      default: "No instructions provided",
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
    language: {
      type: String,
      required: true,
      default: "English",
    },
  },
  {
    timestamps: true,
  }
);

const coursesModel = model("Courses", coursesSchema);
module.exports = coursesModel;
