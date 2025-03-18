const User = require("../models/User");
const Courses = require("../models/Courses");
const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mailTemplates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mailTemplates/paymentSuccessEmail");
const crypto = require("crypto");
const { log } = require("console");
const CourseProgress = require("../models/CourseProgress");
const Payments = require("../models/Payments");
// exports.capturePayment = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const { id } = req.user;
//     if (!courseId)
//       return res.status(400).json({
//         success: false,
//         message: "Please provide courseId and userId",
//       });
//     const course = await Courses.findById(courseId);
//     if (!course)
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     const uid = new mongoose.Types.ObjectId(id);
//     if (course.courseStudents.includes(uid))
//       return res.status(400).json({
//         success: false,
//         message: "User already enrolled in this course",
//       });
//     const amount = course.coursePrice;
//     const currency = "INR";
//     const options = {
//       amount: amount * 100,
//       currency: currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: courseId,
//         userId: uid,
//       },
//     };
//     const paymentResponse = instance.orders.create(options);
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.courseThumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if (digest === signature) {
//       const { courseId, userId } = req.body.payload.payment.entity.notes;
//       const enrolledCourse = await Courses.findByIdAndUpdate(
//         courseId,
//         {
//           $push: { courseStudents: userId },
//         },
//         { new: true }
//       );
//       if (!enrolledCourse)
//         return res.status(404).json({
//           success: false,
//           message: "Course not found",
//         });
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: { courses: courseId },
//         },
//         { new: true }
//       );
//       if (!enrolledStudent)
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       const mailResponse = await mailSender(
//         enrolledStudent.email,
//         "Course Enrollment email from StudyNotion",
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       );
//       if (!mailResponse)
//         return res.status(500).json({
//           success: false,
//           message: "Failed to send email",
//         });
//       return res.status(200).json({
//         success: true,
//         message: "Payment verified and course enrolled successfully",
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid webhook signature",
//       });
//     }
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;

    const { id } = req.user;
    if (courses.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Please provide courses" });
    let totalAmount = 0;
    for (const courseId of courses) {
      const course = await Courses.findById(courseId);
      if (!course)
        return res
          .status(404)
          .json({ success: false, message: `${course.courseName} not found` });
      const userId = new mongoose.Types.ObjectId(id);
      if (course.courseStudents.includes(userId))
        return res.status(400).json({
          success: false,
          message: `User already enrolled in ${course.courseName}`,
        });
      totalAmount += course.coursePrice;
    }
    const currency = "INR";
    const options = {
      amount: totalAmount * 100,
      currency: currency,
      receipt: Math.random(Date.now()).toString(),
    };
    const paymentResponse = await instance.orders.create(options);
    console.log("Payment Response:", paymentResponse);
    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not initiate order",
      error: err.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const amount = req.body?.amount;
    const courses = req.body?.courses;
    const { id } = req.user;
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !courses ||
      !id
    )
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment details" });
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(
        courses,
        id,
        razorpay_order_id,
        razorpay_payment_id,
        amount,
        res
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

async function enrollStudents(
  courses,
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  amount,
  res
) {
  try {
    if (!courses.length || !userId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid course or user details" });
    for (const courseId of courses) {
      const enrolledCourse = await Courses.findByIdAndUpdate(
        courseId,
        {
          $push: { courseStudents: userId },
        },
        { new: true }
      );
      if (!enrolledCourse)
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      const courseProgress = await CourseProgress.create({
        userId: userId,
        courseId: courseId,
        completedVideos: [],
      });
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId, courseProgress: courseProgress._id },
        },
        { new: true }
      );
      if (!enrolledStudent)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      const mailResponse = await mailSender(
        enrolledStudent.email,
        "Course Enrollment email from StudyNotion",
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );
      if (!mailResponse)
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
        });
    }
    const payment = await Payments.create({
      userId: userId,
      courseIds: courses,
      amount: amount / 100,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
    if (!payment)
      return res.status(500).json({
        success: false,
        message: "Failed to create payment record",
      });

    return res.status(200).json({
      success: true,
      message: "Payment successful and courses enrolled successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to enroll students",
      error: error.message,
    });
  }
}
exports.fetchAllPaymentsData = async (req, res) => {
  try {
    const payments = await Payments.find().populate("courseIds");
    return res.status(200).json({
      success: true,
      message: "All payments fetched successfully",
      payments: payments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments data",
      error: error.message,
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    console.log("issue", req.body, req.user);

    const { id } = req.user;
    if (!orderId || !paymentId || !amount || !id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment details" });
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const mailResponse = await mailSender(
      user.email,
      "Payment Recieved email from StudyNotion",
      paymentSuccessEmail(
        `${user.firstName} ${user.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
    if (!mailResponse)
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    return res.status(200).json({
      success: true,
      message: "Payment success email sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
