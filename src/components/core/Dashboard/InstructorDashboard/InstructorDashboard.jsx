import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorDashboardData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/CourseDetailsAPI";
import Spinner from "../../../common/Spinner";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";
import RatingStars from "../../../common/RatingStars";
import GetAvgRating from "../../../../utils/avgRating";
import { FaRegUser } from "react-icons/fa6";
const InstructorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [instructorData, setInstructorData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr?.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr?.totalStudentsEnrolled,
    0
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorResponse = await getInstructorDashboardData(token);
      const coursesResponse = await fetchInstructorCourses(token);
      if (coursesResponse) {
        const hasStudentData = coursesResponse.some(
          (course) => course.courseStudents?.length > 0
        );
        const mostPopular = [...coursesResponse].sort((a, b) => {
          if (hasStudentData) {
            return (
              (b.courseStudents?.length || 0) - (a.courseStudents?.length || 0)
            );
          }
          return b.coursePrice - a.coursePrice;
        });
        setCourses(mostPopular);
      }

      if (instructorResponse) setInstructorData(instructorResponse);

      setLoading(false);
    })();
  }, [paymentLoading]);
  if (loading) return <Spinner />;
  if (!courses.length) {
    return (
      <p className="text-richblack-200 font-medium text-2xl grid place-items-center h-full">
        No courses available yet. Please add some courses to your dashboard to
        see the dashboard.
      </p>
    );
  }
  return (
    <div className="w-full 2xl:w-[90%] flex flex-col">
      <div className="p-4 md:p-6 flex flex-col gap-1">
        <h2 className="text-richblack-5 font-bold text-2xl">
          Hi {user?.firstName} 👋
        </h2>
        <p className="text-richblack-200 font-medium">
          Let’s start something new
        </p>
      </div>
      <div className="flex px-4 md:px-6 gap-4 xl:gap-6 min-[1090px]:flex-row flex-col w-full">
        <InstructorChart courses={instructorData} />
        <div className="p-4 min-[1090px]:p-6 xl:p-8 flex flex-col gap-6 min-[1090px]:gap-8 rounded-lg bg-richblack-800 items-start">
          <h4 className="font-bold text-lg text-richblack-25">
            Overall Informations
          </h4>
          <div className="flex flex-row flex-wrap min-[1090px]:flex-col gap-3 md:gap-6 ">
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">
                Total Courses
              </h6>
              <p className="text-richblack-25 font-bold text-2xl">
                {courses.length}
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">
                Total Students
              </h6>
              <p className="text-richblack-25 font-bold text-2xl">
                {totalStudents}
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">Total Income</h6>
              <p className="text-richblack-25 font-bold text-2xl">
                Rs. {totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* courses */}
      <div className="p-4 md:p-6 m-4 md:m-6 bg-richblack-800 rounded-lg flex gap-4 md:gap-6 flex-col">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-richblack-25 font-bold text-lg">Your Courses</h3>
          <Link
            className="text-yellow-50 text-sm font-semibold"
            to={"/dashboard/my-courses"}
          >
            View All
          </Link>
        </div>
        <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
          {courses.slice(0, 3).map((course) => (
            <div className="flex flex-col gap-3 md:gap-5" key={course?._id}>
              <Link
                to={`/dashboard/edit-course/${course?._id}`}
                className="relative rounded-lg overflow-hidden"
              >
                {courses[0]?._id === course?._id && (
                  <span className="text-white font-medium text-sm rounded-[4px] py-1 px-[6px] bg-pink-100 absolute left-[10px] top-[10px] ">
                    Bestseller
                  </span>
                )}

                <img
                  src={course?.courseThumbnail}
                  alt={`course-${course?.courseName}`}
                  className="h-[201px] w-[354px] object-cover"
                />
              </Link>
              <div className="flex flex-col gap-[9px]">
                <h6 className="text-richblack-5 font-medium">
                  {course?.courseName}
                </h6>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-[2px]">
                    <FaRegUser className="text-richblack-100" />
                    <span className="text-richblack-50 font-semibold">
                      {course?.courseStudents?.length}
                    </span>
                  </div>
                  <span className="font-semibold text-yellow-100">
                    {GetAvgRating(course?.ratingAndReview)}
                  </span>
                  <RatingStars
                    Review_Count={GetAvgRating(course?.ratingAndReview)}
                  />
                  <span className="text-richblack-400 min-[400px]:inline hidden">
                    ({course?.ratingAndReview.length} Rating)
                  </span>
                </div>
                <p className="text-richblack-5 text-xl font-semibold">
                  Rs. {course?.coursePrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
