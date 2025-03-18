const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
});

const categoryModel = model("Category", categorySchema);
module.exports = categoryModel;
