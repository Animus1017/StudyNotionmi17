import React from "react";
import HighlightText from "./HighlightText";
import Button from "./Button";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";
const timelineData = [
  {
    Logo: logo1,
    Heading: "Leadership",
    Content: "Fully committed to the success company",
  },
  {
    border: "",
  },
  {
    Logo: logo2,
    Heading: "Responsibility",
    Content: "Students will always be our top priority",
  },
  {
    border: "",
  },
  {
    Logo: logo3,
    Heading: "Flexibility",
    Content: "The ability to switch is an important skills",
  },
  {
    border: "",
  },
  {
    Logo: logo4,
    Heading: "Solve the problem",
    Content: "Code your way to a solution",
  },
];
const TimelineSection = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent flex flex-col py-8 md:py-16 lg:py-[90px] gap-8 md:gap-10 lg:gap-[52px]">
      <div className="flex flex-col md:flex-row gap-3">
        <h3 className="text-richblack-900 text-3xl md:text-4xl font-semibold">
          Get the skills you need for a{" "}
          <HighlightText text="job that is in demand." />
        </h3>
        <div className="flex flex-col gap-9 md:gap-12 items-start">
          <p className="text-richblack-700">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </p>
          <Button active={true} linkto="/signup">
            Learn More
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-3">
        <div className="flex flex-col gap-5">
          {timelineData.map((item, index) =>
            index & 1 ? (
              <div
                key={index}
                className="border border-richblack-100 border-dashed -rotate-90 w-[42px] relative left-[4%]"
              ></div>
            ) : (
              <div key={index} className="flex gap-6 py-4 px-3 items-center">
                <div className="shadow-[0px_0px_62px_0px_rgba(0,0,0,0.12)] w-[52px] h-[52px] aspect-square rounded-full bg-white flex items-center justify-center">
                  <img src={item.Logo} alt="logo" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h4 className="font-semibold text-lg text-richblack-800">
                    {item.Heading}
                  </h4>
                  <p className="text-sm font-normal text-richblack-700">
                    {item.Content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        <div className="relative flex justify-center">
          <img
            src={timelineImage}
            alt="timelineImage"
            className="shadow-[8px_8px_0px_0px_#FFFFFF] md:shadow-[20px_20px_0px_0px_#FFFFFF] z-10"
          />
          <div className="bg-caribbeangreen-700 p-4 sm:p-7 lg:p-[42px] flex gap-3 sm:gap-5 md:gap-9 lg:gap-[52px] w-fit absolute -bottom-[7%] md:-bottom-[11%] z-10">
            <div className="flex gap-3 md:gap-6 items-center">
              <h6 className="text-3xl md:text-4xl text-white font-bold">10</h6>
              <p className="text-caribbeangreen-300 text-sm font-medium">
                YEARS <br />
                EXPERIENCES
              </p>
            </div>
            <div className="bg-caribbeangreen-500 w-[1px] "></div>
            <div className="flex gap-3 md:gap-6 items-center">
              <h6 className="text-3xl md:text-4xl text-white font-bold">250</h6>
              <p className="text-caribbeangreen-300 text-sm font-medium">
                TYPES OF <br />
                COURSES
              </p>
            </div>
          </div>
          <div className="animate-pulse absolute w-[105%] h-full rounded-[90%] my-auto bg-[linear-gradient(117.82deg,#9CECFB_-9.12%,#65C7F7_48.59%,#0052D4_106.3%)] blur-3xl opacity-60 z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
