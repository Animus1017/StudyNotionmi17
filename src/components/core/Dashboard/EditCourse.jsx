import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFullCourseDetails } from "../../../services/operations/CourseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../redux/slices/courseSlice";
import Spinner from "../../common/Spinner";
import RenderSteps from "./Create Course/RenderSteps";
import { FaAngleLeft } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

const EditCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  async function fetchCourseDetails() {
    setLoading(true);
    const response = await fetchFullCourseDetails({ courseId }, token);

    if (response?.course) {
      dispatch(setCourse(response?.course));
      dispatch(setEditCourse(true));
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchCourseDetails();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full min-[1120px]:w-[96%] xl:w-11/12 2xl:w-[87%]">
          <div className="flex flex-col gap-3 p-4 md:p-6 w-full min-[1120px]:w-4/6">
            <div className="flex flex-col gap-3 ">
              <Link
                to={-1}
                className="text-sm text-richblack-300 flex gap-2  items-center"
              >
                <FaAngleLeft />
                Back
              </Link>
              <h2 className="font-medium text-richblack-5 text-3xl">
                Edit Course
              </h2>
            </div>
            <div className="bg-richblack-800 border border-richblack-700 p-4 md:p-6 flex flex-col gap-3 md:gap-5 rounded-lg h-fit min-[1120px]:hidden">
              <h4 className="text-richblack-5 font-semibold text-lg flex gap-1 items-center">
                <IoIosFlash className="text-yellow-50 text-lg " />
                Course Upload Tips
              </h4>
              <ul className="text-richblack-5 list-disc text-xs font-medium flex flex-col gap-3 pl-6">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>
                  Course Builder is where you create & organize a <br /> course.
                </li>
                <li>
                  Add Topics in the Course Builder section to create <br />{" "}
                  lessons, quizzes, and assignments.
                </li>
                <li>
                  Information from the Additional Data section shows up <br />{" "}
                  on the course single page.
                </li>
                <li>Make Announcements to notify anything important</li>
                <li>Notes to all enrolled students at once.</li>
              </ul>
            </div>
            {course ? (
              <RenderSteps />
            ) : (
              <p className="font-medium text-richblack-300 py-2 md:py-4">
                Course not found
              </p>
            )}
          </div>
          <div className="bg-richblack-800 border border-richblack-700 p-6 flex-col gap-5 rounded-lg  h-fit sticky my-10 top-5 min-[1120px]:flex hidden w-1/3">
            <h4 className="text-richblack-5 font-semibold text-lg flex gap-1 items-center">
              <IoIosFlash className="text-yellow-50 text-lg " />
              Course Upload Tips
            </h4>
            <ul className="text-richblack-5 list-disc text-xs font-medium flex flex-col gap-3 pl-6">
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>
                Course Builder is where you create & organize a <br /> course.
              </li>
              <li>
                Add Topics in the Course Builder section to create <br />{" "}
                lessons, quizzes, and assignments.
              </li>
              <li>
                Information from the Additional Data section shows up <br /> on
                the course single page.
              </li>
              <li>Make Announcements to notify anything important</li>
              <li>Notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
