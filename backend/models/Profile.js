const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  dob: {
    type: Date,
  },
  about: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  countryCode: {
    type: String,
    default: "+91",
    trim: true,
  },
});

const profileModel = model("Profile", profileSchema);
module.exports = profileModel;
