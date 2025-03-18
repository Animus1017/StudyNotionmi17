import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStudentDashboardData } from "../../../../services/operations/profileAPI";
import Spinner from "../../../common/Spinner";
import StudentChart from "./StudentChart";
import { convertSecondsToDuration } from "../../../../utils/secToDuration";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";
import { FaRegUser } from "react-icons/fa";
const StudentDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const totalTimeSpent = studentData?.reduce(
    (acc, curr) => acc + curr?.timeSpent,
    0
  );
  const totalCompletedCourses = studentData?.reduce(
    (acc, curr) => (curr.progressPercentage === 100 ? acc + 1 : acc),
    0
  );
  const totalUncompletedCourses = studentData?.length - totalCompletedCourses;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getStudentDashboardData(token);
      if (response) setStudentData(response);

      setLoading(false);
    })();
  }, [paymentLoading]);
  if (loading) return <Spinner />;
  if (!studentData.length) {
    return (
      <p className="text-richblack-200 font-medium text-2xl grid place-items-center h-full">
        You haven't enrolled any courses yet. Start by exploring the catalog and
        joining courses that interest you.
      </p>
    );
  }
  return (
    <div className="w-full xl:w-[96%] 2xl:w-[90%] flex flex-col">
      {/* header */}
      <div className="p-4 md:p-6 flex flex-col gap-1">
        <h2 className="text-richblack-5 font-bold text-2xl">
          Hi {user?.firstName} 👋
        </h2>
        <p className="text-richblack-200 font-medium">
          Let’s start something new
        </p>
      </div>
      {/* chart */}
      <div className="flex px-4 md:px-6 gap-4 xl:gap-6 min-[1090px]:flex-row flex-col w-full">
        <StudentChart courses={studentData} />
        <div className="p-4 min-[1090px]:p-6 xl:p-8 flex flex-col gap-6 min-[1090px]:gap-8 rounded-lg bg-richblack-800 items-start">
          <h4 className="font-bold text-lg text-richblack-25">
            Overall Informations
          </h4>
          <div className="flex flex-row flex-wrap min-[1090px]:flex-col gap-3 md:gap-6 ">
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">
                Total Enrolled Courses
              </h6>
              <p className="text-richblack-25 font-bold text-2xl">
                {studentData?.length}
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">
                Completed Courses
              </h6>
              <p className="text-richblack-25 font-bold text-2xl">
                {totalCompletedCourses}
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">
                Uncompleted Courses
              </h6>
              <p className="text-richblack-25 font-bold text-2xl">
                {totalUncompletedCourses}
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold text-richblack-300">
                Total Time Spent
              </h6>
              <p className="text-richblack-25 font-bold text-2xl">
                {convertSecondsToDuration(totalTimeSpent)}
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
            to={"/dashboard/enrolled-courses"}
          >
            View All
          </Link>
        </div>
        <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
          {studentData.slice(0, 3).map((course) => (
            <div className="flex flex-col gap-3 md:gap-5" key={course?._id}>
              <Link
                to={`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSections?.[0]?._id}`}
                className="relative rounded-lg overflow-hidden"
              >
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

export default StudentDashboard;
