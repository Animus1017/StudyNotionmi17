import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
  GET_ALL_INSTRUCTOR_COURSES_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API,
  MARK_ALL_COMPLETED_API,
} = courseEndpoints;

export async function fetchCourseCategories() {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("COURSE_CATEGORIES API RESPONSE............", response);
    result = response.data?.categories;
  } catch (error) {
    console.log("COURSE_CATEGORIES API ERROR............", error);
    toast.error("Could Not Get Course Categories");
  }
  return result;
}
export async function editCourseDetails(formData, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT_COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Course Updated Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("EDIT_COURSE API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function createCourse(formData, token) {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Course Created Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function createSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Section Created Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("CREATE_SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function editSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT_SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Section Updated Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("EDIT_SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function deleteSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Section Deleted Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("DELETE_SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function createSubSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_SUB_SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Lecture Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_SUB_SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function editSubSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT_SUB_SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Lecture Updated Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("EDIT_SUB_SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function deleteSubSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_SUB_SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Lecture Deleted Successfully");
    result = response.data?.data;
  } catch (error) {
    console.log("DELETE_SUB_SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function fetchInstructorCourses(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("INSTRUCTOR_COURSES API RESPONSE............", response);
    result = response.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR_COURSES API ERROR............", error);
    toast.error("Could Not Get Instructor Courses");
  }
  return result;
}
export async function deleteCourse(data, token) {
  console.log(data);

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      "Content-Type": "application/json", // Ensure JSON request
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Course Deleted Successfully");
  } catch (error) {
    console.log("DELETE_COURSE API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
}
export async function fetchFullCourseDetails(data, token) {
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("FULL_COURSE_DETAILS API RESPONSE............", response);
    result = response.data?.data;
  } catch (error) {
    console.log("FULL_COURSE_DETAILS API ERROR............", error);
    toast.error("Could Not Get Course Details");
  }
  return result;
}
export async function fetchCourseById(courseId) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("COURSE_DETAILS API RESPONSE............", response);
    result = response.data?.data;
  } catch (error) {
    console.log("COURSE_DETAILS API ERROR............", error);
    toast.error("Could Not Get Course Details");
  }
  toast.dismiss(toastId);
  return result;
}

export async function createRating(data, token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Rating Created Successfully");
    result = response?.data?.course;
  } catch (error) {
    console.log("CREATE_RATING API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function markLectureasCompleted(data, token) {
  const toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("MARK_LECTURE_AS_COMPLETED API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = true;
    toast.success("Lecture Marked as Completed Successfully");
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETED API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
export async function markAllCompleted(data, token) {
  const toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("POST", MARK_ALL_COMPLETED_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("MARK_ALL_AS_COMPLETED API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = true;
    toast.success("Course Marked as Completed Successfully");
  } catch (error) {
    console.log("MARK_ALL_AS_COMPLETED API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}
