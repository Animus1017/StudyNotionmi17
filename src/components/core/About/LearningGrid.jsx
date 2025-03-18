import React from "react";
import HighlightText from "../HomePage/HighlightText";
import Button from "../HomePage/Button";
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];
const LearningGrid = () => {
  return (
    <div className="max-w-maxContent w-11/12 mx-auto py-8 md:py-16 lg:py-[90px]">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {LearningGridArray.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[294px] ${
              item.order === -1 ? "col-span-1 lg:col-span-2" : ""
            } ${item.order === 3 ? "col-span-1 lg:col-start-2" : ""}`}
          >
            {item.order < 0 && (
              <div className="flex flex-col gap-3 w-full h-full">
                <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-richblack-5">
                  {item.heading} <HighlightText text={item.highlightText} />
                </h2>

                <div className="flex flex-col gap-6 lg:gap-12 items-start mb-0 md:mb-3 lg:mb-[26px]">
                  <p className="text-richblack-300 font-medium">
                    {item.description}
                  </p>
                  <Button active={true} linkto={item.BtnLink}>
                    {item.BtnText}
                  </Button>
                </div>
              </div>
            )}
            {item.order > 0 && (
              <div
                className={`p-8 ${
                  item.order & 1 ? "bg-richblack-700" : "bg-richblack-800"
                } flex flex-col gap-8 w-full h-full`}
              >
                <h3 className="text-lg font-semibold text-richblack-5">
                  {item.heading}
                </h3>
                <p className="text-sm text-richblack-100">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningGrid;
