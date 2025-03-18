const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
      // validate: {
      //     validator: (value) => {
      //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //         return emailRegex.test(value);
      //     },
      //     message: "Invalid email format"
      // }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      // validate: {
      //     validator: (value) => {
      //         const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      //         return passwordRegex.test(value);
      //     },
      //     message: "Invalid password format"
      // }
    },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    //   validate: {
    //       validator: (value, model) => value === model.password,
    //       message: "Passwords do not match"
    //   }
    // },
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["Admin", "Student", "Instructor"],
    },
    additionalDetails: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    image: {
      type: String,
      required: true,
    },
    courseProgress: [
      {
        type: Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema);
module.exports = userModel;
