import React from "react";
import frame from "../../..//assets/Images/frame.png";
import { useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
const Template = ({ title, description1, description2, img, formType }) => {
  const loading = useSelector((state) => state.auth?.loading);
  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-8 md:py-16">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-start items-center md:items-start  md:justify-between gap-16 md:gap-8 lg:gap-14  xl:gap-28 flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-6 md:gap-9 p-0 lg:p-8 w-full md:w-1/2">
            <div className="flex flex-col gap-3">
              <h2 className="text-richblack-5 text-3xl font-semibold">
                {title}
              </h2>
              <div>
                <p className="text-richblack-100 text-lg">{description1}</p>
                <p className="font-bold font-edu-sa text-blue-100 italic">
                  {description2}
                </p>
              </div>
            </div>
            {formType === "login" ? <LoginForm /> : <SignupForm />}
          </div>
          <div className=" w-full md:w-1/2">
            <div className="mx-auto relative w-fit">
              <img src={img} alt="img" className="z-10 relative" />
              <img
                src={frame}
                alt="frame"
                className="absolute md:top-7 md:left-7 top-4 left-4 z-0 "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
