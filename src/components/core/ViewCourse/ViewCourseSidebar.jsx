import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft, FaAngleDown } from "react-icons/fa";
import { convertSecondsToDurationShort } from "../../../utils/secToDuration";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaPlay } from "react-icons/fa";
import { IoIosTv } from "react-icons/io";
import { FaAnglesRight } from "react-icons/fa6";
import { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ViewCourseSidebar = ({ setReviewModal, setExpand, expand }) => {
  const [activeSections, setActiveSections] = useState([]);
  const [activeSubsection, setActiveSubsection] = useState("");
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();
  const {
    courseSectionData,
    courseData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse) || {
    courseSectionData: [],
    courseData: {},
    completedLectures: [],
    totalNoOfLectures: 0,
  };
  const ref = useRef(null);
  const buttonRef = useRef(null);
  useOnClickOutside(ref, (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) return;
    setExpand(false);
  });
  const navigate = useNavigate();

  const handleActiveSection = (id) => {
    setActiveSections((prev) =>
      prev.includes(id) ? prev.filter((active) => active !== id) : [...prev, id]
    );
  };

  function calculateLectureTime(subSections) {
    let totalTime = 0;
    subSections?.forEach((lecture) => {
      totalTime += lecture.timeDuration || 0;
    });
    return convertSecondsToDurationShort(totalTime);
  }

  useEffect(() => {
    if (!courseSectionData?.length) return;
    console.log("Completed Lectures:", completedLectures);

    const activeSectionIndex = courseSectionData.findIndex(
      (section) => section?._id === sectionId
    );
    if (activeSectionIndex >= 0) {
      const activeSectionId = courseSectionData[activeSectionIndex]._id;
      if (!activeSections.includes(activeSectionId)) {
        setActiveSections((prev) => [...prev, activeSectionId]);
      }

      const activeSubsectionIndex = courseSectionData[
        activeSectionIndex
      ]?.subSections.findIndex((subSec) => subSec?._id === subSectionId);
      const activeSubsectionId =
        courseSectionData[activeSectionIndex]?.subSections?.[
          activeSubsectionIndex
        ]?._id;
      setActiveSubsection(activeSubsectionId);
    }
  }, [courseSectionData, courseData, location.pathname]);
  return (
    <div className="w-fit bg-richblack-800 border-r border-r-richblack-700 py-5 md:py-[30px]  h-full flex flex-col gap-[10px] ">
      <div className="px-2 grid place-items-center sm:hidden w-fit">
        <button
          onClick={() => setExpand((prev) => !prev)}
          className={`text-richblack-5 bg-richblack-400 rounded-full p-1 ${
            expand ? "rotate-180" : ""
          }`}
          ref={buttonRef}
        >
          <FaAnglesRight />
        </button>
      </div>
      <div
        className={` sm:flex flex-col gap-[10px] transition-all duration-300 ${
          expand ? "flex" : "hidden"
        } `}
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <div className="px-2  md:px-6 flex flex-col gap-3 items-start">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="text-richblack-5 bg-richblack-400 rounded-full p-1"
          >
            <FaAngleLeft />
          </button>
          <div className="py-2 flex flex-col gap-2 ">
            <span className="text-richblack-25 font-bold text-lg">
              {courseData?.courseName || "Course Name"}
            </span>
            <span className="text-sm font-semibold text-caribbeangreen-100">
              {completedLectures?.length || 0}/{totalNoOfLectures || 0}
            </span>
          </div>
          <button
            className="rounded-lg md:py-3 md:px-6 py-2 px-3 bg-yellow-50 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] text-richblack-900 font-medium"
            onClick={() => setReviewModal(true)}
          >
            Add Review
          </button>
        </div>
        <div className="my-1 mx-2 md:mx-4 border border-richblack-600"></div>
        {courseSectionData?.map((section) => (
          <div key={section?._id}>
            <div
              className="bg-richblack-700 border-b border-b-richblack-600 py-2 md:py-4 px-2 md:px-6 flex gap-3 items-center justify-between cursor-pointer"
              onClick={() => handleActiveSection(section?._id)}
            >
              <p className="text-richblack-5 text-sm font-medium">
                {section?.sectionName || "Section"}
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="text-richblack-25 text-sm">
                  {calculateLectureTime(section?.subSections)}
                </div>
                <FaAngleDown
                  className={`text-richblack-200 transition-transform duration-300 ${
                    activeSections.includes(section?._id) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              className={`py-2 md:py-4 px-2 md:px-6 flex-col gap-2 md:gap-3 ${
                activeSections.includes(section?._id) ? "flex" : "hidden"
              }`}
            >
              {activeSections.includes(section?._id) &&
                section?.subSections?.map((subSection) => {
                  const isCompleted = completedLectures?.includes(
                    subSection?._id.toString()
                  ); // Normalize to string
                  return (
                    <div
                      key={subSection?._id}
                      className={`flex gap-2 items-center text-sm ${
                        activeSubsection === subSection?._id
                          ? "text-blue-100 font-medium"
                          : !isCompleted
                          ? "text-richblack-25 font-medium"
                          : "text-richblack-400 line-through"
                      }`}
                      onClick={() => {
                        navigate(
                          `view-course/${courseData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                        );
                        setActiveSubsection(subSection?._id);
                      }}
                    >
                      {activeSubsection === subSection?._id ? (
                        <FaPlay className="text-base" />
                      ) : isCompleted ? (
                        <ImCheckboxChecked className="text-base" />
                      ) : (
                        <ImCheckboxUnchecked className="text-base" />
                      )}

                      {/* Removed hidden checkbox, using direct condition */}
                      <span>{subSection?.title}</span>
                      <IoIosTv className="text-base" />
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCourseSidebar;
