import React from "react";
import instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import Button from "./Button";
import { TbArrowRight } from "react-icons/tb";
const Instructor = () => {
  return (
    <div className="py-8 md:py-16  lg:py-[90px] flex flex-col lg:flex-row gap-8 md:gap-16lg:gap-[98px] items-center">
      <img
        src={instructor}
        alt="Instructor"
        className="md:shadow-[-20px_-20px_0px_0px_#FFFFFF] shadow-[-8px_-8px_0px_0px_#FFFFFF]"
      />
      <div>
        <div className="flex flex-col gap-11 md:gap-16 items-start">
          <div className="flex flex-col gap-3">
            <h2 className=" font-semibold text-4xl text-richblack-5">
              Become an <br />
              <HighlightText text={"instructor"} />
            </h2>
            <p className="text-richblack-300 font-medium ">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
          </div>
          <Button active={true} linkto="/signup">
            <div className="flex items-center gap-2">
              Start Teaching Today
              <TbArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
