import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import {
  convertSecondsToDuration,
  convertSubsectionTime,
} from "../../../utils/secToDuration";
import { IoIosTv } from "react-icons/io";

const CourseAccordionBar = ({ content, isActive, handleActive }) => {
  const [totalDuration, setTotalDuration] = useState(0);
  const [active, setActive] = useState(false);
  const TRUNCATE_LENGTH = 20;
  useEffect(() => {
    setActive(isActive.includes(content._id));
  }, [isActive]);

  useEffect(() => {
    let duration = 0;
    content.subSections.forEach((sub) => {
      duration += sub.timeDuration;
    });
    setTotalDuration(duration);
  }, [content]);

  return (
    <div className="overflow-hidden border border-richblack-600">
      <div
        className="border-b border-richblack-600 bg-richblack-700 px-4 md:px-6 lg:px-8 py-2 md:py-4 flex justify-between cursor-pointer transition-all duration-300"
        onClick={() => handleActive(content._id)}
      >
        <div className="flex gap-1 items-center">
          <i className={isActive.includes(content._id) ? "rotate-180" : ""}>
            <FaAngleDown className="text-richblack-200" />
          </i>
          <h6 className="font-medium text-richblack-5 text-sm">
            {content.sectionName}
          </h6>
        </div>
        <div className="flex gap-3 md:w-[46%] lg:w-[27%] xl:w-[21%] ">
          <span className="text-yellow-50 text-sm">
            {content.subSections.length || 0} lectures
          </span>
          <span className="text-richblack-25 text-sm flex-grow text-end">
            {convertSecondsToDuration(totalDuration)}
          </span>
        </div>
      </div>
      <div
        className={`relative transition-[max-height] duration-150 ease-[ease] overflow-hidden ${
          active ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="px-4 md:px-6 lg:px-8 py-2 md:py-4 flex flex-col gap-3">
          {content.subSections.map((sub) => (
            <div
              key={sub._id}
              className="flex gap-3 justify-between items-start"
            >
              <details className="group cursor-pointer">
                <summary className="flex gap-2 items-center text-richblack-5 text-sm font-medium">
                  <IoIosTv className="text-richblack-50 text-lg" />
                  {sub?.title}
                  <FaAngleDown className="group-open:rotate-180 text-richblack-200" />
                </summary>
                <p className="text-sm text-richblack-50 pl-4 md:pl-7">
                  {sub?.description.split(" ").length > TRUNCATE_LENGTH
                    ? sub?.description
                        .split(" ")
                        .slice(0, TRUNCATE_LENGTH)
                        .join(" ") + "..."
                    : sub?.description}
                </p>
              </details>
              <p className="text-richblack-25 text-sm">
                {convertSubsectionTime(sub?.timeDuration)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
