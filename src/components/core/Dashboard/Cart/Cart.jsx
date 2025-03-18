import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import Modal from "../../../common/Modal";
import toast from "react-hot-toast";
import { buyCourse } from "../../../../services/operations/paymentAPI";
import Spinner from "../../../common/Spinner";

const Cart = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const courses = cart.map((c) => c?._id);
  const handleBuyCourse = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor.You can't buy a course.");
      return;
    }
    if (token) {
      buyCourse(token, courses, user, navigate, dispatch);
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
  if (paymentLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-full md:w-[89%]">
      {/* top section */}
      <div className="flex flex-col gap-0 md:gap-3 w-full">
        <div className="p-4 md:p-6 flex flex-col gap-3">
          <p className="text-sm text-richblack-300">
            <Link to="/">Home</Link> /{" "}
            <Link to="/dashboard/student">Dashboard</Link>/{" "}
            <Link>
              <span className="text-yellow-50 font-medium">Wishlist</span>
            </Link>
          </p>
          <h2 className="text-richblack-5 font-medium text-3xl">My Wishlist</h2>
        </div>
        <div className="p-4 md:pl-6 text-richblack-400 font-semibold flex flex-col gap-3">
          <p>{cart?.length || 0} Courses in Wishlist</p>
          <div className="border border-richblack-700"></div>
        </div>
      </div>
      <div>
        {!cart.length ? (
          <p className="text-richblack-400 text-3xl font-medium p-4 md:p-6">
            Cart is Empty
          </p>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row gap-5 py-6">
            <div className=" flex flex-col gap-6 lg:gap-8 w-full lg:w-9/12">
              {cart.map((course) => (
                <CartCard key={course?._id} course={course} />
              ))}
            </div>
            <div className="bg-richblack-800 border border-richblack-700 p-6 rounded-lg flex flex-col gap-4 h-fit mx-4 md:mx-6 lg:mx-0 flex-grow-0 lg:flex-grow static lg:sticky top-6">
              <div className="flex flex-col gap-1">
                <p className="text-richblack-200 tet-sm font-semibold">
                  Total:
                </p>
                <p className="text-yellow-50 font-semibold text-2xl">
                  Rs. {totalPrice}
                </p>
              </div>
              <button
                className="rounded-lg py-3 px-6 bg-yellow-50 text-richblack-900 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] font-medium"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
      {confirmationModal && (
        <Modal {...confirmationModal} setHandler={setConfirmationModal} />
      )}
    </div>
  );
};

export default Cart;
