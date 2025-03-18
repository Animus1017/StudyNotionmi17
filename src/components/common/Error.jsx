import React from "react";
import error from "../../assets/Images/error.png";
import HighlightText from "../core/HomePage/HighlightText";
import Button from "../core/HomePage/Button";
const Error = () => {
  return (
    <div className="max-w-maxContent w-11/12 mx-auto flex gap-28 justify-between py-16 items-center">
      <div className="w-1/2 relative">
        <img
          src={error}
          alt="img"
          className="shadow-[20px_20px_0px_0px_#F5F5F5] relative z-50"
        />
        <div className="top-0 animate-pulse absolute w-full h-full rounded-[90%] my-auto bg-[linear-gradient(117.82deg,#9CECFB_-9.12%,#65C7F7_48.59%,#0052D4_106.3%)] blur-3xl opacity-60 z-0"></div>
      </div>
      <div className="py-8 px-4 lg:py-16 lg:px-6 w-1/2">
        <div className="text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
            <HighlightText text="404" />
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-richblack-5">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-richblack-300">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Button active={true} linkto="/">
            Back to HomePage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
