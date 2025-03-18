import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import OtpInput from "react-otp-input";
import { IoMdTimer } from "react-icons/io";
import { sendOtp, signUp } from "../services/operations/authAPI";
const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  console.log(signupData);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(signupData, otp);

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className="mx-auto max-w-maxContent w-11/12 grid place-items-center h-[calc(100vh-5rem)]">
      <div className="p-0 sm:p-8 flex flex-col gap-6 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <div className="flex flex-col gap-3">
          <h2 className="text-richblack-5 font-semibold text-3xl">
            Verify email
          </h2>
          <p className="text-richblack-100 text-lg">
            A verification code has been sent to you. Enter the code below
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="w-full">
            <OtpInput
              value={otp}
              onChange={(value) => {
                const cleanedOtp = value.replace(/[^0-9]/g, "");
                setOtp(cleanedOtp);
              }}
              numInputs={6}
              containerStyle="flex justify-between w-full"
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-12 h-12 p-2 bg-richblack-800 text-richblack-5 outline-none 
                   rounded-lg text-center shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] focus:shadow-[0px_0px_0px_2px_#E7C009]"
                  style={{ boxSizing: "border-box" }}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
              type="submit"
            >
              Verify email
            </button>
            <div className="p-3 flex justify-between">
              <Link
                to="/login"
                className=" flex gap-2 text-richblack-5 font-medium items-center"
              >
                <FaArrowLeftLong className="text-lg" />
                Back to Login
              </Link>
              <button
                className="flex gap-2 font-medium items-center text-blue-100"
                onClick={() => dispatch(sendOtp(signupData?.email, navigate))}
              >
                <IoMdTimer className="text-lg" />
                Resend it
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
