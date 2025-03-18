// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  fetchAllPaymentsData,
} = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);
router.get("/fetchPaymentsData", auth, isStudent, fetchAllPaymentsData);

module.exports = router;
