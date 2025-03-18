const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
  },
  countryCode: {
    type: String,
    required: true,
    trim: true,
    default: "+91-India",
  },
  message: {
    type: String,
    trim: true,
  },
});

const contactModel = model("Contact", contactSchema);
module.exports = contactModel;
