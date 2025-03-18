import React, { useEffect, useState } from "react";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";
import { CgTrash } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../redux/slices/cartSlice";
const CartCard = ({ course }) => {
  const [avgRating, setAvgRating] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReview);
    let lectures = 0;
    course?.courseContent.forEach((content) => {
      lectures += content.subSections.length;
    });
    setTotalLectures(lectures);
    setAvgRating(count);
  }, [course]);
  return (
    <div className="flex flex-col gap-6 xl:gap-8 px-4 md:px-6 w-full">
      <div className="flex gap-3 xl:flex-row flex-col min-[480px]:flex-row md:flex-col xl:gap-5 justify-between">
        <div className="flex gap-3 xl:gap-5 md:flex-row flex-col flex-grow">
          <img
            src={course?.courseThumbnail}
            alt={`course-${course?.courseName}`}
            className="h-[148px] rounded-lg aspect-video w-fit"
          />
          <div className="flex flex-col gap-2">
            <h6 className="text-richblack-5 text-lg font-medium">
              {course?.courseName}
            </h6>
            <p className="text-richblack-300">
              {course?.courseInstructor?.firstName}{" "}
              {course?.courseInstructor?.lastName}
            </p>
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-yellow-100 text">
                {avgRating || 0}
              </span>
              <RatingStars Review_Count={avgRating} Star_Size={18} />
              <span className="text-richblack-400">
                ({course?.ratingAndReview.length} ratings)
              </span>
            </div>

            <p className="text-richblack-50 text-sm flex gap-2 flex-wrap">
              {course?.courseContent?.length} sections{" "}
              <span className="text-richblack-5">•</span>
              {totalLectures} lectures{" "}
              <span className="text-richblack-5">•</span> Beginner
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse min-[480px]:flex-col md:flex-row-reverse justify-between min-[480px]:justify-start xl:justify-start md:justify-between items-center min-[480px]:items-start md:items-center xl:items-start xl:flex-col gap-5">
          <button
            className="rounded-lg border p-3 flex gap-2 bg-richblack-800 border-richblack-700 font-medium text-pink-200 items-center"
            onClick={() => dispatch(removeFromCart(course?._id))}
          >
            {" "}
            <CgTrash className="text-xl" /> Remove
          </button>
          <span className="text-yellow-50 font-semibold text-2xl">
            Rs. {course?.coursePrice}
          </span>
        </div>
      </div>
      {cart.at(cart.length - 1)._id === course._id ? null : (
        <div className="border border-richblack-700"></div>
      )}
    </div>
  );
};

export default CartCard;
