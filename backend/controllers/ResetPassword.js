const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const { passwordResetConfirmation } = require("../mailTemplates/passwordReset");
const passwordResetEmail = require("../mailTemplates/resetPasswordTemplate");
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 15 * 60 * 1000,
      },
      { new: true }
    );
    const resetUrl = `http://localhost:3000/update-password/${token}`;
    const mailResponse = await mailSender(
      email,
      "Password reset link from StudyNotion",
      passwordResetEmail(`${user.firstName} ${user.lastName}`, resetUrl)
    );
    if (!mailResponse) {
      return res.status(500).json({ message: "Failed to send email" });
    }
    return res.json({
      success: true,
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    if (!token || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token invalid",
      });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(403).json({ message: "Token expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email: user.email },
      { password: hashedPassword },
      { new: true }
    );
    try {
      const mailResponse = await mailSender(
        user.email,
        "Password Reset Notification from StudyNotion",
        passwordResetConfirmation(
          user.email,
          `${user.firstName} ${user.lastName}`
        )
      );
      if (!mailResponse) {
        throw new Error("Failed to send password changed email");
      }
      console.log(`PAssword Change success email sent to ${this.email}`);
    } catch (err) {
      console.error(err.message);
    }
    return res.json({
      success: true,
      message: "Password updated successfully",
      data: user.email,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
