import React, { useEffect, useState } from "react";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import { MdOutlineNewReleases } from "react-icons/md";
import { BiSolidHot } from "react-icons/bi";

const CourseCard = ({
  course,
  height,
  best = false,
  hot = false,
  neww = false,
}) => {
  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReview);
    setAvgRating(count);
  }, [course]);
  return (
    <Link className="flex flex-col gap-5" to={`/course/${course._id}`}>
      <div className={`rounded-lg ${height} relative overflow-hidden`}>
        <img
          src={course?.courseThumbnail}
          alt={`course-${course?.courseName}`}
          className={`object-cover w-full h-full`}
        />
        <div className="absolute left-[10px] top-[10px] flex flex-col gap-1">
          {best && (
            <span className="text-white font-medium text-sm rounded-[4px] py-1 px-[6px] bg-pink-100">
              Bestseller
            </span>
          )}
          {neww && (
            <span className="text-white font-medium text-sm rounded-[4px] py-1 px-[6px] bg-caribbeangreen-100 flex gap-[2px] items-center">
              <MdOutlineNewReleases size={16} /> New
            </span>
          )}
          {hot && (
            <span className="text-white font-medium text-sm rounded-[4px] py-1 px-[6px] bg-brown-100 flex gap-[2px] items-center">
              <BiSolidHot size={16} /> Hot
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[9px]">
        <div className="flex flex-col gap-2">
          <h4 className="text-richblack-5 font-medium">{course?.courseName}</h4>
          <p className="text-richblack-300">
            {course?.courseInstructor?.firstName}{" "}
            {course?.courseInstructor?.lastName}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-yellow-100">{avgRating}</span>
          <RatingStars Review_Count={avgRating} />
          <span className="text-richblack-400">
            ({course?.ratingAndReview.length} Rating)
          </span>
        </div>
        <p className="text-richblack-5 font-semibold text-xl">
          Rs. {course?.coursePrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
