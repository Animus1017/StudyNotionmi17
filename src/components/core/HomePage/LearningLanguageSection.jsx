import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Button from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-[52px] py-8 md:py-16 lg:py-[90px]">
      <div className="flex flex-col gap-3 items-center">
        <h2 className=" font-semibold text-3xl md:text-4xl text-left md:text-center">
          Your swiss knife for <HighlightText text={"learning any language"} />
        </h2>
        <p className="text-richblack-700 font-medium w-full md:w-2/3 text-left md:text-center">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <img
          src={know_your_progress}
          alt="know_your_progress"
          className="object-contain -mr-0 -mb-16 lg:-mb-0 lg:-mr-32"
        />
        <img
          src={compare_with_others}
          alt="compare_with_others"
          className="object-contain"
        />
        <img
          src={plan_your_lessons}
          alt="plan_your_lessons"
          className="object-contain -ml-0 -mt-24 lg:-mt-40 xl:-mt-0 xl:-ml-36"
        />
      </div>
      <div className="flex justify-center">
        <Button active={true} linkto="/signup">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
