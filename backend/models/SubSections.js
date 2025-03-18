const { Schema, model } = require("mongoose");

const subSectionsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  timeDuration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const subSectionsModel = model("SubSections", subSectionsSchema);
module.exports = subSectionsModel;
