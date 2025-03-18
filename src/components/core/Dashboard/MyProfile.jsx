import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../HomePage/Button";
import { PiNotePencilBold } from "react-icons/pi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../../utils/constants";
const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  let formattedDate = null;
  if (user?.additionalDetails?.dob) {
    const date = new Date(user?.additionalDetails?.dob);
    const options = { year: "numeric", month: "long", day: "numeric" };
    formattedDate = date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="w-full md:w-11/12 flex flex-col">
      <div className="p-4 lg:p-6 flex flex-col gap-3">
        <p className="text-sm text-richblack-300">
          <Link to="/">Home</Link> /{" "}
          <Link
            to={
              user?.accountType === ACCOUNT_TYPE.STUDENT
                ? "/dashboard/student"
                : "/dashboard/instructor"
            }
          >
            Dashboard
          </Link>
          /{" "}
          <Link>
            <span className="text-yellow-50 font-medium">My Profile</span>
          </Link>
        </p>
        <h2 className="font-medium text-richblack-5 text-3xl">My Profile</h2>
      </div>
      <div className="w-11/12 mx-auto flex flex-col gap-5 py-6">
        {/* section1 */}
        <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex md:flex-row flex-col gap-3 md:gap-5 border border-richblack-700 items-start md:items-center justify-between w-full">
          <div className="flex gap-3 md:gap-6 items-start min-[480px]:items-center min-[480px]:flex-row flex-col md:w-fit w-full">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="object-cover w-14 md:w-[78px] aspect-square rounded-full"
            />
            <div className="flex flex-col gap-[2px] w-full">
              <h3 className="text-richblack-5 font-semibold text-lg w-full">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-richblack-300 text-sm flex-grow break-words">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="self-end">
            <Button active={true} linkto="/dashboard/settings">
              <div className="flex gap-2 items-center">
                <PiNotePencilBold className="text-xl md:text-2xl" /> Edit
              </div>
            </Button>
          </div>
        </div>
        {/* section2 */}
        <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-3 md:gap-5 border border-richblack-700 w-full">
          <div className="flex justify-between items-center gap-3 md:gap-5">
            <h3 className="text-richblack-5 font-semibold text-lg">About</h3>
            <Button active={true} linkto="/dashboard/settings">
              <div className="flex gap-2 items-center">
                <PiNotePencilBold className="text-2xl" /> Edit
              </div>
            </Button>
          </div>
          <p className="text-richblack-400 font-medium text-sm">
            {user?.additionalDetails?.about
              ? user?.additionalDetails?.about
              : "Write Something About Yourself"}
          </p>
        </div>
        {/* section3 */}
        <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-3 md:gap-5 border border-richblack-700 w-full">
          <div className="flex justify-between items-center gap-3 md:gap-5">
            <h3 className="text-richblack-5 font-semibold text-lg">
              Personal Details
            </h3>
            <Button active={true} linkto="/dashboard/settings">
              <div className="flex gap-2 items-center">
                <PiNotePencilBold className="text-2xl" /> Edit
              </div>
            </Button>
          </div>
          <div className="flex w-full gap-3 md:gap-1 sm:flex-row flex-col">
            <div className="flex flex-col gap-[2px] text-sm w-full md:w-1/2">
              <h6 className=" text-richblack-600">First Name</h6>
              <p className="text-richblack-5 font-medium capitalize">
                {user?.firstName ? user?.firstName : "Add firstname"}
              </p>
            </div>
            <div className="flex flex-col gap-[2px] text-sm w-full md:w-1/2">
              <h6 className=" text-richblack-600">Last Name</h6>
              <p className="text-richblack-5 font-medium capitalize">
                {user?.lastName ? user?.lastName : "Add lastname"}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-3 md:gap-1 sm:flex-row flex-col">
            <div className="flex flex-col gap-[2px] text-sm w-full md:w-1/2">
              <h6 className=" text-richblack-600">Email</h6>
              <p className="text-richblack-300 break-words">
                {user?.email ? user?.email : "Add email"}
              </p>
            </div>
            <div className="flex flex-col gap-[2px] text-sm w-full md:w-1/2">
              <h6 className=" text-richblack-600">Phone Number</h6>
              <p className="text-richblack-5 font-medium capitalize">
                {user?.additionalDetails?.phoneNumber
                  ? user?.additionalDetails?.phoneNumber
                  : "Add Contact Number"}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-3 md:gap-1 sm:flex-row flex-col">
            <div className="flex flex-col gap-[2px] text-sm w-full md:w-1/2">
              <h6 className=" text-richblack-600">Gender</h6>
              <p className="text-richblack-5 font-medium capitalize">
                {user?.additionalDetails?.gender
                  ? user?.additionalDetails?.gender
                  : "Add gender"}
              </p>
            </div>
            <div className="flex flex-col gap-[2px] text-sm w-full md:w-1/2">
              <h6 className=" text-richblack-600">Date of Birth</h6>
              <p className="text-richblack-5 font-medium capitalize">
                {formattedDate ? formattedDate : "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
        {/* section4 */}
        <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-3 md:gap-5 border border-richblack-700 w-full">
          <div className="flex justify-between items-center gap-3 md:gap-5">
            <h3 className="text-richblack-5 font-semibold text-lg">Password</h3>
            <Button active={true} linkto="/dashboard/settings">
              <div className="flex gap-2 items-center">
                <PiNotePencilBold className="text-2xl" /> Edit
              </div>
            </Button>
          </div>
          <div className="flex w-full md:w-4/5 gap-6 sm:flex-row flex-col">
            <label className="flex flex-col gap-[6px] w-full sm:w-1/2">
              <div className="flex gap-[2px] text-sm text-richblack-5 items-center">
                Password<sup className="text-pink-200">*</sup>
              </div>
              <div className="relative">
                <input
                  type="password"
                  disabled={true}
                  className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                  placeholder="**********"
                />
                <div className="text-richblack-300 text-2xl absolute right-2 top-1/4 rounded-sm">
                  <AiOutlineEyeInvisible />
                </div>
              </div>
            </label>
            <label className="flex flex-col gap-[6px] w-full sm:w-1/2">
              <div className="flex gap-[2px] text-sm text-richblack-5 items-center">
                Confirm Password<sup className="text-pink-200">*</sup>
              </div>
              <div className="relative">
                <input
                  type="password"
                  disabled={true}
                  className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
                  placeholder="**********"
                />
                <div className="text-richblack-300 text-2xl absolute right-2 top-1/4 rounded-sm">
                  <AiOutlineEyeInvisible />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
