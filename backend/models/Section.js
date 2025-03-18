const { Schema, model } = require("mongoose");

const sectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
  },
  subSections: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSections",
      required: true,
    },
  ],
});

sectionSchema.pre("findOneAndDelete", async function (next) {
  const section = await this.model.findOne(this.getQuery());
  if (section) {
    await model("SubSections").deleteMany({
      _id: { $in: section.subSections },
    });
  }
  next();
});

const sectionModel = model("Section", sectionSchema);
module.exports = sectionModel;
