import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import RenderSteps from "./RenderSteps";
import { IoIosFlash } from "react-icons/io";
const AddCourse = () => {
  return (
    <div className="flex w-full min-[1120px]:w-[96%] xl:w-11/12 2xl:w-[87%]">
      <div className="flex flex-col gap-3 p-4 md:p-6 w-full min-[1120px]:w-4/6">
        <div className="flex flex-col gap-3 ">
          <Link
            to={-1}
            className="text-sm text-richblack-300 flex gap-2  items-center"
          >
            <FaAngleLeft />
            Back to Dashboard
          </Link>
          <h2 className="font-medium text-richblack-5 text-3xl">Add Course</h2>
        </div>
        <div className="bg-richblack-800 border border-richblack-700 p-4 md:p-6 flex flex-col gap-3 md:gap-5 rounded-lg h-fit min-[1120px]:hidden">
          <h4 className="text-richblack-5 font-semibold text-lg flex gap-1 items-center">
            <IoIosFlash className="text-yellow-50 text-lg " />
            Course Upload Tips
          </h4>
          <ul className="text-richblack-5 list-disc text-xs font-medium flex flex-col gap-3 pl-6">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>
              Course Builder is where you create & organize a <br /> course.
            </li>
            <li>
              Add Topics in the Course Builder section to create <br /> lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up <br /> on
              the course single page.
            </li>
            <li>Make Announcements to notify anything important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
        <RenderSteps />
      </div>
      <div className="bg-richblack-800 border border-richblack-700 p-6 flex-col gap-5 rounded-lg  h-fit sticky my-10 top-5 min-[1120px]:flex hidden w-1/3">
        <h4 className="text-richblack-5 font-semibold text-lg flex gap-1 items-center">
          <IoIosFlash className="text-yellow-50 text-lg " />
          Course Upload Tips
        </h4>
        <ul className="text-richblack-5 list-disc text-xs font-medium flex flex-col gap-3 pl-6">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>
            Course Builder is where you create & organize a <br /> course.
          </li>
          <li>
            Add Topics in the Course Builder section to create <br /> lessons,
            quizzes, and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up <br /> on the
            course single page.
          </li>
          <li>Make Announcements to notify anything important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
