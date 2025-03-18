import React from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import ChangeProfile from "./ChangeProfile";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <div className="w-full xl:w-11/12 flex flex-col min-h-screen">
      <div className="p-4 lg:p-6 flex flex-col gap-3 w-full">
        <Link
          to={-1}
          className="text-sm text-richblack-300 flex gap-2 items-center"
        >
          <FaAngleLeft />
          Back
        </Link>
        <h2 className="font-medium text-richblack-5 text-3xl">My Profile</h2>
      </div>
      <div className="w-11/12 mx-auto flex flex-col gap-6 md:gap-11 py-3 md:py-6">
        <div className="flex flex-col gap-5 w-full">
          <ChangeProfile />

          <ProfileDetails />

          <ChangePassword />
        </div>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
