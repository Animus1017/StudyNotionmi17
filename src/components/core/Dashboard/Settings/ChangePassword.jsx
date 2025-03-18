import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiInformation2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../../../services/operations/settingsAPI";
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const onSubmit = (data) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(data.newPassword)) {
      toast.error("Invalid password format");
      return;
    }
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    dispatch(updatePassword(token, data));
  };
  return (
    <div className="bg-richblack-800 rounded-lg p-6 flex flex-col gap-5 border border-richblack-700 w-full">
      <h3 className="text-richblack-5 font-semibold text-lg">
        Change Password
      </h3>
      <form
        className="flex flex-col w-full gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-6 w-full justify-between flex-wrap">
          <label className="flex flex-col gap-[6px] flex-grow">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Current Password<sup className="text-pink-200">*</sup>
            </p>
            <div className="relative">
              <input
                type={`${showOldPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                placeholder="Enter Password"
                {...register("oldPassword", { required: true })}
              />
              {errors.oldPassword && (
                <span className="-mt-1 text-xs text-pink-200">
                  Please enter current password.
                </span>
              )}
              <div
                className="text-richblack-300 text-2xl cursor-pointer absolute right-2 top-1/4"
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-[6px] flex-grow">
            <div className="flex gap-[2px] text-sm text-richblack-5 items-center">
              New Password<sup className="text-pink-200">*</sup>{" "}
              <div className="relative group hidden [@media(min-width:420px)]:inline-block">
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
                type={`${showNewPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                placeholder="Enter Password"
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && (
                <span className="-mt-1 text-xs text-pink-200">
                  Please enter new password.
                </span>
              )}
              <div
                className="text-richblack-300 text-2xl cursor-pointer absolute right-2 top-1/4 rounded-sm"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-[6px] flex-grow">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Confirm New Password<sup className="text-pink-200">*</sup>
            </p>
            <div className="relative">
              <input
                type={`${showConfirmNewPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                placeholder="Enter Password"
                {...register("confirmNewPassword", { required: true })}
              />
              {errors.confirmNewPassword && (
                <span className="-mt-1 text-xs text-pink-200">
                  Please enter confirm new password.
                </span>
              )}
              <div
                className="text-richblack-300 text-2xl cursor-pointer absolute right-2 top-1/4"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
            </div>
          </label>
        </div>

        <div className="flex gap-5 self-end">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="rounded-lg font-medium py-[6px] px-[18px] transition-all duration-200 hover:scale-95 bg-richblack-600 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset] text-richblack-50"
          >
            Cancel
          </button>
          <button
            className={`flex gap-1 items-center rounded-lg font-medium py-[6px] px-[18px] transition-all duration-200 hover:scale-95 bg-yellow-50 text-richblack-900 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]`}
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
