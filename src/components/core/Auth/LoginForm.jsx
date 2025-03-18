import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) =>
    dispatch(login(data.email, data.password, navigate));
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      className="flex flex-col gap-6 md:gap-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
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
        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
            Password<sup className="text-pink-200">*</sup>
          </p>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <div
              className="text-richblack-300 text-2xl cursor-pointer absolute right-4 top-1/4"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="text-xs text-blue-100 self-end"
          >
            Forgot Password
          </Link>
        </label>
      </div>
      <button
        className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
