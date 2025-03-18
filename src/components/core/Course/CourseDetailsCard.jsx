import React, { useEffect } from "react";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import toast from "react-hot-toast";
import { addToCart, removeFromCart } from "../../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { TbClockHour8, TbFileCheck } from "react-icons/tb";
import { PiCursorBold } from "react-icons/pi";
import { FaMobileScreenButton } from "react-icons/fa6";
const CourseDetailsCard = ({
  course,
  handleBuyCourse,
  setConfirmationModal,
  duration,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCopy = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor.You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase the course",
      btn1: {
        text: "Login",
        action: () => {
          navigate("/login");
        },
      },
      btn2: {
        text: "Cancel",
        action: () => {
          setConfirmationModal(null);
        },
      },
    });
  };
  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);
  return (
    <div className="bg-richblack-700 rounded-lg overflow-hidden sticky top-8">
      <img
        src={course?.courseThumbnail}
        alt={`course-${course?.courseName}`}
        className="h-[201px] hidden md:inline-block"
      />
      <div className="p-6 flex flex-col gap-4">
        <span className="text-richblack-5 font-bold text-3xl">
          Rs. {course?.coursePrice}
        </span>
        <div className="flex flex-col gap-3">
          {user && !course?.courseStudents.includes(user?._id) && (
            <button
              className="rounded-lg px-6 py-3 bg-yellow-50 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] text-richblack-900 font-medium"
              onClick={
                cart?.findIndex((item) => item._id === course?._id) >= 0
                  ? () => dispatch(removeFromCart(course?._id))
                  : handleAddToCart
              }
            >
              {cart?.findIndex((item) => item._id === course?._id) >= 0
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
          )}
          <button
            className={`rounded-lg px-6 py-3 ${
              user && course?.courseStudents.includes(user?._id)
                ? "bg-yellow-50 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] text-richblack-900"
                : "bg-richblack-900 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset] text-richblack-5"
            }   font-medium `}
            onClick={
              user && course?.courseStudents.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.courseStudents.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          <p className="text-richblack-25 text-sm text-center">
            30-Day Money-Back Guarantee
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-richblack-5 font-medium ">This course includes:</p>
          <p className="flex items-center gap-2 font-medium text-sm text-caribbeangreen-100">
            {" "}
            <TbClockHour8 className="text-caribbeangreen-50 text-base" />
            {duration} on-demand video
          </p>
          <p className="flex items-center gap-2 font-medium text-sm text-caribbeangreen-100">
            {" "}
            <PiCursorBold className="text-caribbeangreen-50 text-base" /> Full
            Lifetime access
          </p>
          <p className="flex items-center gap-2 font-medium text-sm text-caribbeangreen-100">
            {" "}
            <FaMobileScreenButton className="text-caribbeangreen-50 text-base" />{" "}
            Access on Mobile and TV
          </p>
          <p className="flex items-center gap-2 font-medium text-sm text-caribbeangreen-100">
            {" "}
            <TbFileCheck className="text-caribbeangreen-50 text-base" />{" "}
            Certificate of completion
          </p>
        </div>
        <div className="px-6 py-3 flex justify-center">
          <button
            className="text-yellow-100 font-medium text-center"
            onClick={handleCopy}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
