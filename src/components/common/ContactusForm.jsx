import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../services/operations/contactAPI";
const ContactusForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("here");

    dispatch(
      sendMessage(
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNo,
        data.countryCode,
        data.message
      )
    );
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        countryCode: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form
      className="flex flex-col gap-9 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 md:flex-row flex-col lg:flex-col xl:flex-row w-full">
          <label className="flex flex-col gap-[6px] flex-grow">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
              placeholder="Enter first name"
              {...register("firstName", {
                required: true,
              })}
            />
          </label>
          <label className="flex flex-col gap-[6px] flex-grow">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
              placeholder="Enter last name"
              {...register("lastName", {
                required: true,
              })}
            />
          </label>
        </div>
        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
            placeholder="Enter email address"
            {...register("email", {
              required: true,
            })}
          />
        </label>
        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
            Phone Number<sup className="text-pink-200">*</sup>
          </p>
          <div className="flex gap-3 sm:gap-5">
            {" "}
            <select
              {...register("countryCode", {
                required: true,
              })}
              defaultValue={
                countrycode.find((c) => c.code === "+91")?.code || ""
              }
              className="w-[22%] sm:w-1/6 rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
            >
              {countrycode.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.code}-{country.country}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="w-[78%]  sm:w-5/6 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield] rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              placeholder="01234 56789"
              {...register("phoneNo", {
                required: true,
              })}
            />
          </div>
        </label>
      </div>
      <label className="flex flex-col gap-[6px]">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
          Message
        </p>
        <textarea
          rows={5}
          className="rounded-lg p-3 outline-none bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
          placeholder="Enter message here..."
          {...register("message")}
        />
      </label>
      <button
        className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
        type="submit"
      >
        {isSubmitting ? "Sending Message..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactusForm;
