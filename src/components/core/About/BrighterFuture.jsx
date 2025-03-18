import React from "react";
import HighlightText from "../HomePage/HighlightText";
import about1 from "../../../assets/Images/aboutus1.webp";
import about2 from "../../../assets/Images/aboutus2.webp";
import about3 from "../../../assets/Images/aboutus3.webp";
const BrighterFuture = () => {
  return (
    <div className="bg-richblack-900 relative">
      <div className="bg-richblack-800 absolute inset-0 h-[90%] z-0"></div>
      <div className="max-w-maxContent w-11/12 mx-auto flex flex-col pt-8 md:pt-16 lg:pt-[86px] gap-8 md:gap-10 lg:gap-[52px] relative z-50">
        {/* text above image */}
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-11 items-center">
          <p className="text-richblack-200 font-medium">About us</p>
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-3xl md:text-4xl text-left md:text-center font-semibold text-richblack-5 leading-[44px]">
              Driving Innovation in Online Education for a{" "}
              <br className="hidden md:inline" />{" "}
              <HighlightText text="Brighter Future" />
            </h2>
            <p className="font-medium text-richblack-300 w-full lg:w-4/6 text-left md:text-center">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
        </div>
        {/* images */}
        <div className="flex gap-6 flex-wrap justify-center w-full">
          <img src={about1} alt="about1" />
          <img src={about2} alt="about2" />
          <img src={about3} alt="about3" />
        </div>
      </div>
    </div>
  );
};

export default BrighterFuture;
