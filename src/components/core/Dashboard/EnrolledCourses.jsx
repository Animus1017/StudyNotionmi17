import React, { useEffect, useRef, useState } from "react";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import { RxDotsVertical } from "react-icons/rx";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { markAllCompleted } from "../../../services/operations/CourseDetailsAPI";
import { markAllCompletedLectures } from "../../../redux/slices/viewCourseSlice";
import { toast } from "react-hot-toast";
const EnrolledCourses = () => {
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const { completedLectures } = useSelector((state) => state.viewCourse);
  const TRUNCATE_LENGTH = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(""); // Tracks which dropdown is open
  const dropdownRefs = useRef({}); // Refs for all dropdowns
  const buttonRefs = useRef({}); // Refs for all buttons
  const [active, setActive] = useState(1);
  const [categorizedCourses, setCategorizedCourses] = useState({
    all: [],
    uncompleted: [],
    completed: [],
  });

  const categorizeCourses = (courses) => {
    const all = courses;
    const uncompleted = courses.filter(
      (course) => course.progressPercentage < 100
    );
    const completed = courses.filter(
      (course) => course.progressPercentage === 100
    );

    return { all, uncompleted, completed };
  };

  useEffect(() => {
    console.log(categorizedCourses);

    if (active === 1) setEnrolledCourses(categorizedCourses.all);
    else if (active === 2) setEnrolledCourses(categorizedCourses.uncompleted);
    else setEnrolledCourses(categorizedCourses.completed);
  }, [active]);

  // Manual outside click handling with useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open) {
        const isClickOnButton = Object.values(buttonRefs.current).some(
          (ref) => ref && ref.contains(e.target)
        );
        const isClickInsideDropdown = Object.values(dropdownRefs.current).some(
          (ref) => ref && ref.contains(e.target)
        );
        if (!isClickOnButton && !isClickInsideDropdown) {
          setOpen("");
        }
      }
    };

    // Match useOnClickOutside's event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  async function fetchEnrolledCourses() {
    setLoading(true);
    const response = await getUserEnrolledCourses(token);
    if (response?.length) {
      setCategorizedCourses(categorizeCourses(response));
      setEnrolledCourses(response);
    }
    setLoading(false);
  }
  async function handleMarkAllAsCompleted(course) {
    if (course?.progressPercentage === 100) {
      toast.error("Course is already marked as completed");
      return;
    }
    setLoading(true);
    const response = await markAllCompleted({ courseId: course?._id }, token);
    if (response) {
      console.log("here");

      dispatch(markAllCompletedLectures(course));
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEnrolledCourses();
    setActive(1);
    // eslint-disable-next-line
  }, [paymentLoading, completedLectures]);

  const handleToggleDropdown = (e, courseId) => {
    e.stopPropagation();
    console.log("Toggling dropdown for:", courseId, "current open:", open);
    setOpen(open === courseId ? "" : courseId);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full xl:w-[90%] flex flex-col">
          <div className="m-4 md:p-6 flex flex-col gap-3">
            <p className="text-sm text-richblack-300">
              <Link to="/">Home</Link> /{" "}
              <Link>
                Dashboard /{" "}
                <span className="text-yellow-50 font-medium">
                  Enrolled Courses
                </span>
              </Link>
            </p>
            <h2 className="text-richblack-5 font-medium text-3xl">
              Enrolled Courses
            </h2>
          </div>
          <div className="rounded-full p-1 flex gap-[5px] bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] mx-4 md:mx-6 w-fit flex-wrap justify-center">
            <button
              className={`${
                active === 1
                  ? "bg-richblack-900  text-richblack-5 font-bold"
                  : "text-richblack-200 font-medium"
              } py-[6px] px-[18px]  rounded-full transition-all duration-200`}
              onClick={() => setActive(1)}
            >
              All
            </button>
            <button
              className={`${
                active === 2
                  ? "bg-richblack-900  text-richblack-5 font-bold"
                  : "text-richblack-200 font-medium"
              } py-[6px] px-[18px]  rounded-full transition-all duration-200`}
              onClick={() => setActive(2)}
            >
              Uncompleted
            </button>
            <button
              className={`${
                active === 3
                  ? "bg-richblack-900  text-richblack-5 font-bold"
                  : "text-richblack-200 font-medium"
              } py-[6px] px-[18px]  rounded-full transition-all duration-200`}
              onClick={() => setActive(3)}
            >
              Completed
            </button>
          </div>
          <div className="border border-richblack-700 rounded-lg m-4 md:m-6">
            <div className="border-b border-b-richblack-700 p-4 gap-2 sm:gap-4 rounded-t-lg bg-richblack-700 text-richblack-50 text-sm font-medium flex">
              <p className="w-1/4 sm:w-[27%] md:w-[57%] lg:w-[59%] 2xl:w-[60%]">
                Course Name
              </p>
              <p className="hidden sm:block w-1/5 md:w-[12%]">Durations</p>
              <p className="w-[38%] md:w-[22%]">Progress</p>
              <div className="flex-grow"></div>
            </div>
            <div>
              {!enrolledCourses.length ? (
                <p className=" text-richblack-400 p-4">
                  No enrolled courses found
                </p>
              ) : (
                enrolledCourses.map((course, index) => (
                  <div
                    key={course?._id}
                    className={`sm:p-4 p-2 flex gap-2 sm:gap-4 ${
                      index === enrolledCourses?.length - 1
                        ? ""
                        : "border-b border-b-richblack-700"
                    }`}
                  >
                    <div
                      className="w-1/4 sm:w-[27%] md:w-[60%] flex sm:flex-row flex-col items-start sm:items-center gap-3 md:gap-5 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/view-course/${course._id}/section/${
                            course?.courseContent?.at(0)._id
                          }/sub-section/${
                            course?.courseContent?.at(0)?.subSections?.at(0)
                              ?._id
                          }`
                        )
                      }
                    >
                      <img
                        src={course?.courseThumbnail}
                        alt={`course-${course?.courseName}`}
                        className="h-[52px] aspect-square rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-[2px] flex-grow">
                        <h6 className="text-richblack-5 font-medium">
                          {course?.courseName}
                        </h6>
                        <p className="text-richblack-300 md:block hidden">
                          {course?.courseDescription.split(" ").length >
                          TRUNCATE_LENGTH
                            ? course?.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : course?.courseDescription}
                        </p>
                      </div>
                    </div>
                    <p className="hidden sm:block w-1/5 md:w-[12%] font-medium text-richblack-50 my-auto">
                      {course?.timeDuration}
                    </p>
                    <div className="w-[58%] sm:w-[38%] md:w-[22%] flex flex-col gap-1 my-auto">
                      <p className="text-richblack-50 text-xs font-semibold">
                        {course?.progressPercentage === 100
                          ? "Completed"
                          : `Progress ${course?.progressPercentage || 0}%`}
                      </p>
                      <ProgressBar
                        completed={course?.progressPercentage || 0}
                        maxCompleted={100}
                        height="8px"
                        bgColor={
                          course?.progressPercentage === 100
                            ? "#06D6A0"
                            : "#47A5C5"
                        }
                        baseBgColor="#2C333F"
                        isLabelVisible={false}
                      />
                    </div>
                    <div className="flex-grow my-auto flex justify-end relative">
                      <button
                        ref={(el) => (buttonRefs.current[course?._id] = el)}
                        className="text-richblack-5 text-3xl"
                        onClick={(e) => handleToggleDropdown(e, course?._id)}
                      >
                        <RxDotsVertical />
                      </button>

                      {open === course?._id && (
                        <div
                          className="absolute z-50 bg-richblack-600 border border-richblack-500 p-3 flex flex-col gap-3 rounded-lg text-richblack-5 font-semibold w-56 right-4 top-[120%]"
                          onClick={(e) => e.stopPropagation()}
                          ref={(el) => (dropdownRefs.current[course?._id] = el)}
                        >
                          <button
                            className="p-1 flex gap-3 items-center hover:bg-richblack-400 rounded-md transition-all duration-200"
                            onClick={() => handleMarkAllAsCompleted(course)}
                            disabled={loading}
                          >
                            <BsFileEarmarkCheckFill className="text-xl" />
                            Mark as Completed
                          </button>
                          <button
                            className="p-1 flex gap-3 items-center hover:bg-richblack-400 rounded-md transition-all duration-200"
                            onClick={() =>
                              navigate(
                                `/view-course/${course._id}/section/${
                                  course?.courseContent?.at(0)._id
                                }/sub-section/${
                                  course?.courseContent
                                    ?.at(0)
                                    ?.subSections?.at(0)?._id
                                }`
                              )
                            }
                            disabled={loading}
                          >
                            <AiFillEye className="text-xl" />
                            View Course
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
