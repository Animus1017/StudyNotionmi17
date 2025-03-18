import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FaRegCalendar } from "react-icons/fa6";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import countrycode from "../../../../data/countrycode.json";
import { updateProfile } from "../../../../services/operations/settingsAPI";
const ProfileDetails = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("details", user);
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: user?.additionalDetails?.gender || "",
      dob: user?.additionalDetails?.dob
        ? new Date(user?.additionalDetails?.dob).toISOString().split("T")[0]
        : "",
    },
  });
  const gender = watch("gender", "");
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updateProfile(token, data));
  };
  useEffect(() => {
    reset({
      gender: user?.additionalDetails?.gender || "",
      dob: formatDateForInput(user?.additionalDetails?.dob),
    });
  }, [user, reset]);
  return (
    <div className="bg-richblack-800 rounded-lg  p-4 md:p-6 flex gap-3 md:gap-5 flex-col border border-richblack-700 w-full">
      <h3 className="text-richblack-5 font-semibold text-lg">
        Profile Information
      </h3>
      <form
        className="flex flex-col w-full gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex md:flex-row flex-col gap-5 md:gap-6 w-full justify-between">
          <label className="flex flex-col gap-[6px] w-full md:w-1/2">
            <p className="text-sm text-richblack-5">First Name</p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              placeholder="Enter first name"
              defaultValue={user?.firstName ? user?.firstName : ""}
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="-mt-1 text-xs text-pink-200">
                Please enter your first name.
              </span>
            )}
          </label>
          <label className="flex flex-col gap-[6px] w-full md:w-1/2">
            <p className="text-sm text-richblack-5">Last Name</p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              placeholder="Enter last name"
              defaultValue={user?.lastName ? user?.lastName : ""}
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="-mt-1 text-xs text-pink-200">
                Please enter your last name.
              </span>
            )}
          </label>
        </div>
        <div className="flex md:flex-row flex-col gap-5 md:gap-6 w-full justify-between">
          <label className="flex flex-col gap-[6px] w-full md:w-1/2">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Phone Number
            </p>
            <div className="flex gap-3 lg:gap-5">
              {" "}
              <select
                {...register("countryCode", {
                  required: true,
                })}
                defaultValue={
                  countrycode.find((c) => c.code === "+91")?.code ||
                  countrycode.find(
                    (c) => c.code === user?.additionalDetails?.countryCode
                  )?.code
                }
                className="w-1/4 sm:w-1/6 md:w-1/4 lg:w-1/5 xl:w-1/6 rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              >
                {countrycode.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code}-{country.country}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="w-3/4 sm:w-5/6 md:w-3/4 lg:w-4/5 xl:w-5/6 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield] rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
                placeholder="01234 56789"
                defaultValue={
                  user?.additionalDetails?.phoneNumber
                    ? user?.additionalDetails?.phoneNumber
                    : ""
                }
                {...register("phoneNumber")}
              />
            </div>
          </label>
          <label className="flex flex-col gap-[6px] w-full md:w-1/2">
            <p className="text-sm text-richblack-5">Email</p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              placeholder="Enter email address"
              defaultValue={user?.email}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-xs text-pink-200">
                Please enter your email.
              </span>
            )}
          </label>
        </div>
        <div className="flex md:flex-row flex-col gap-5 md:gap-6 w-full justify-between">
          <label className="flex flex-col gap-[6px] w-full md:w-1/2 relative">
            <p className="text-sm text-richblack-5">Date of Birth</p>
            <input
              type="date"
              className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 [&::-webkit-calendar-picker-indicator]:opacity-0  [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              placeholder="Pick Date of Birth"
              {...register("dob", {
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
            />
            {errors.dob && (
              <span className="-mt-1 text-xs text-red-500">
                {errors.dob.message}
              </span>
            )}
            <FaRegCalendar className="absolute text-richblack-200 text-lg right-4 bottom-[20%] pointer-events-none" />
          </label>
          <div className="flex flex-col gap-[6px] w-full md:w-1/2">
            <p className="text-sm text-richblack-5">Gender</p>
            <div className="rounded-lg p-3 bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 flex flex-wrap md:flex-nowrap">
              {["Male", "Female", "Others"].map((option, index) => (
                <label
                  key={option}
                  className="flex gap-1 md:gap-2 lg:gap-3 items-center cursor-pointer flex-grow"
                >
                  <input
                    type="radio"
                    defaultValue={option}
                    {...register("gender")}
                    className=" hidden"
                    checked={gender === option}
                  />
                  {gender === option ? (
                    <MdOutlineRadioButtonChecked className="text-lg text-yellow-50" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked className="text-lg text-yellow-50" />
                  )}

                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
            About
          </p>
          <textarea
            rows={5}
            className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
            placeholder="Enter about yourself..."
            defaultValue={
              user?.additionalDetails?.about
                ? user?.additionalDetails?.about
                : ""
            }
            {...register("about")}
          />
        </label>
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
