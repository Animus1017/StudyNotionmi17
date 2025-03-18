import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { resetPassword } from "../services/operations/authAPI";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password", "");
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);
  const hasMinLength = password.length >= 8;
  const token = location.pathname.split("/").at(-1);
  const onSubmit = (data) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      toast.error("Invalid password format");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    if (linkSent) {
      navigate("/login");
    } else {
      dispatch(
        resetPassword(
          setLinkSent,
          data.password,
          data.confirmPassword,
          token,
          setEmail
        )
      );
    }
  };
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const maskedName = name[0] + "*".repeat(name.length - 1);
    return `${maskedName}@${domain}`;
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="mx-auto max-w-maxContent w-11/12 grid place-items-center h-[calc(100vh-5rem)]">
      <div className="p-0 sm:p-8 flex flex-col gap-6 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <div className="flex flex-col gap-3">
          <h2 className="text-richblack-5 font-semibold text-3xl">
            {linkSent ? "Reset complete!" : "Choose new password"}
          </h2>
          <p className="text-richblack-100 text-lg">
            {linkSent
              ? `All done! We have sent an email to ${maskEmail(
                  email
                )} to confirm`
              : "Almost done. Enter your new password and you're all set."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {!linkSent && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-[6px]">
                  <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
                    New password<sup className="text-pink-200">*</sup>
                  </p>
                  <div className="relative">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                      placeholder="Enter Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    <div
                      className="text-richblack-300 text-2xl cursor-pointer absolute right-2 top-1/4"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                </label>
                <label className="flex flex-col gap-[6px]">
                  <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
                    Confirm new password<sup className="text-pink-200">*</sup>
                  </p>
                  <div className="relative">
                    <input
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                      placeholder="Enter Password"
                      {...register("confirmPassword", {
                        required: true,
                      })}
                    />
                    <div
                      className="text-richblack-300 text-2xl cursor-pointer absolute right-2 top-1/4"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="flex flex-col gap-1">
                  <p
                    className={`flex gap-[6px] items-center ${
                      hasLowercase
                        ? "text-caribbeangreen-300"
                        : "text-richblack-300"
                    }`}
                  >
                    <FaCheckCircle />
                    one lowercase character
                  </p>
                  <p
                    className={`flex gap-[6px] items-center ${
                      hasUppercase
                        ? "text-caribbeangreen-300"
                        : "text-richblack-300"
                    }`}
                  >
                    <FaCheckCircle />
                    one uppercase character
                  </p>
                  <p
                    className={`flex gap-[6px] items-center ${
                      hasNumber
                        ? "text-caribbeangreen-300"
                        : "text-richblack-300"
                    }`}
                  >
                    <FaCheckCircle />
                    one number
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p
                    className={`flex gap-[6px] items-center ${
                      hasSpecialChar
                        ? "text-caribbeangreen-300"
                        : "text-richblack-300"
                    }`}
                  >
                    <FaCheckCircle />
                    one special character
                  </p>
                  <p
                    className={`flex gap-[6px] items-center ${
                      hasMinLength
                        ? "text-caribbeangreen-300"
                        : "text-richblack-300"
                    }`}
                  >
                    <FaCheckCircle />8 character minimum
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
              type="submit"
            >
              {linkSent ? "Return to login" : "Reset password"}
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

export default ResetPassword;
