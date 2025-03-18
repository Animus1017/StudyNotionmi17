const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
    index: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const feedbackModel = model("RatingAndReviews", feedbackSchema);
module.exports = feedbackModel;
