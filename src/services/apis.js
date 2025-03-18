const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DASHBOARD_DATA: BASE_URL + "/profile/instructorDashboard",
  GET_STUDENT_DASHBOARD_DATA: BASE_URL + "/profile/studentDashboard",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  GET_ALL_PAYMENTS_DATA: BASE_URL + "/payment/fetchPaymentsData",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/courses/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/courses/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/courses/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/courses/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/courses/createCourse",
  CREATE_SECTION_API: BASE_URL + "/courses/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/courses/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/courses/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/courses/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courses/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/courses/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/courses/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/courses/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/courses/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/courses/updateCourseProgress",
  MARK_ALL_COMPLETED_API: BASE_URL + "/courses/markAllAsCompleted",
  CREATE_RATING_API: BASE_URL + "/courses/createRating",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/courses/getReviews",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/courses/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/courses/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  REMOVE_DISPLAY_PICTURE_API: BASE_URL + "/profile/removeDisplayPicture",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
