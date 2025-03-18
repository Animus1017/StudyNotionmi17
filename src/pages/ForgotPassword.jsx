import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { sendResetPasswordToken } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setEmail(data.email);
    dispatch(sendResetPasswordToken(data.email, setEmailSent));
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="mx-auto max-w-maxContent w-11/12 grid place-items-center h-[calc(100vh-5rem)]">
      <div className="p-0 sm:p-8 flex flex-col gap-9 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-[45%]">
        <div className="flex flex-col gap-3">
          <h2 className="text-richblack-5 font-semibold text-3xl">
            {emailSent ? "Check email" : "Reset your password"}
          </h2>
          <p className="text-richblack-100 text-lg">
            {emailSent
              ? `We have sent the reset email to ${email}`
              : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          {!emailSent && (
            <label className="flex flex-col gap-[6px]">
              <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
                Email Address<sup className="text-pink-200">*</sup>
              </p>
              <input
                type="email"
                className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
                placeholder="Enter email address"
                {...register("email", { required: true })}
              />
            </label>
          )}
          <div className="flex flex-col gap-3">
            <button
              className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
              type="submit"
            >
              {emailSent ? "Resend email" : "Reset Password"}
            </button>
            <Link
              to="/login"
              className="p-3 flex gap-2 text-richblack-5 font-medium items-center"
            >
              <FaArrowLeftLong className="text-lg" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
