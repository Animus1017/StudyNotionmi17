const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent } = require("../middlewares/auth");
const {
  deleteAccount,
  updateProfile,
  getProfile,
  getEnrolledCourses,
  updateProfilePicture,
  removeProfilePicture,
  fetchInstructorDashboardData,
  getStudentDashboardData,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getProfile);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateProfilePicture);
router.put("/removeDisplayPicture", auth, removeProfilePicture);
//instrucor dashboard
router.get(
  "/instructorDashboard",
  auth,
  isInstructor,
  fetchInstructorDashboardData
);
//student dashboard
router.get("/studentDashboard", auth, isStudent, getStudentDashboardData);

module.exports = router;
