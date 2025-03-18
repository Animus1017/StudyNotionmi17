import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import CourseTable from "./CourseTable";
import { fetchInstructorCourses } from "../../../../services/operations/CourseDetailsAPI";
import { useSelector } from "react-redux";

const MyCourses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchAllCourses() {
    setLoading(true);
    const response = await fetchInstructorCourses(token);
    if (response.length) setCourses(response);
    setLoading(false);
  }
  useEffect(() => {
    fetchAllCourses();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col w-full lg:w-[96%] min-[1520px]:w-[89%]">
      <div className="p-4 md:p-6 flex gap-4 md:gap-6 items-start justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-richblack-300">
            <Link to="/">Home</Link> /{" "}
            <Link to="/dashboard/instructor">Dashboard</Link>/{" "}
            <Link>
              <span className="text-yellow-50 font-medium">My Courses</span>
            </Link>
          </p>
          <h2 className="font-medium text-richblack-5 text-3xl">My Courses</h2>
        </div>
        <button
          className="bg-yellow-50 shadow-[2px_-2px_0px_0px_#FFFFFF82_inset] rounded-lg py-2 md:py-3 px-4 md:px-6 flex gap-2 items-center"
          onClick={() => navigate("/dashboard/add-course")}
          disabled={loading}
        >
          <MdAddCircleOutline className="text-lg" />
          New
        </button>
      </div>
      <div className="px-3 md:px-5">
        {courses && <CourseTable courses={courses} setCourses={setCourses} />}
      </div>
    </div>
  );
};

export default MyCourses;
