import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../redux/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { RiInformation2Fill } from "react-icons/ri";
const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const signupData = { ...data, accountType };
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(data.email, navigate));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];
  return (
    <form
      className="flex flex-col gap-6 md:gap-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <div className="flex flex-col gap-5 ">
        {/* firstname and lastname */}
        <div className="flex gap-5 flex-col sm:flex-row md:flex-col lg:flex-row w-full">
          <label className="flex flex-col gap-[6px] w-full">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
            />
          </label>
          <label className="flex flex-col gap-[6px] w-full">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
              placeholder="Enter last name"
              {...register("lastName", { required: true })}
            />
          </label>
        </div>
        {/* email */}
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
        {/* password */}
        <div className="flex gap-5 flex-col sm:flex-row md:flex-col lg:flex-row w-full">
          <label className="flex flex-col gap-[6px] w-full">
            <div className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Create Password<sup className="text-pink-200">*</sup>{" "}
              <div className="relative group">
                <RiInformation2Fill className="text-[#374957] cursor-pointer" />
                <div className="bg-pure-greys-5 p-3 text-xs flex flex-col gap-1 leading-5 transition-all opacity-0 group-hover:visible group-hover:opacity-100 invisible duration-200 absolute w-48 z-50 left-5 -top-1/2">
                  <div className="w-5 h-5 absolute rotate-45 bg-pure-greys-5 top-1 -left-[1px] -z-10"></div>
                  <p className="text-richblack-900 font-medium ">
                    Make sure your password is at
                  </p>
                  <div className="text-richblack-600 flex flex-col">
                    <p className="">least 8 characters and contains:</p>
                    <ul className="list-disc list-inside pl-2">
                      <li>
                        At least 1 uppercase letter and 1 lowercase letter
                      </li>
                      <li>At least 1 number</li>
                      <li>At least 1 special character (like @#%^)</li>
                    </ul>
                  </div>
                  <p className="font-medium text-richblack-600">
                    Avoid common passwords or strings like "password",
                    <br />
                    "qwerty", or "12345".
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              <div
                className="text-richblack-300 text-2xl cursor-pointer absolute right-2 top-1/4 rounded-sm"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-[6px] w-full">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <div className="relative">
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                placeholder="Enter Password"
                {...register("confirmPassword", { required: true })}
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
      </div>
      <button
        className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
