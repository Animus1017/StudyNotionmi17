import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCourse,
  setCourse,
  setStep,
} from "../../../../redux/slices/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../services/operations/CourseDetailsAPI";
const PublishSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  function goBack() {
    dispatch(setStep(2));
  }
  const gotoCourses = () => {
    dispatch(resetCourse());
    navigate("/dashboard/my-courses");
  };
  const onSubmit = async (data) => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      gotoCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course?._id);
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    );
    setLoading(true);
    const response = await editCourseDetails(formData, token);
    if (response) {
      gotoCourses();
    }
    setLoading(false);
  };
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) setValue("public", true);
    else setValue("public", false);
  }, []);
  return (
    <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-4 md:gap-[26px] border border-richblack-700 w-full">
      <h2 className="font-semibold text-richblack-5 text-2xl">
        Publish Settings
      </h2>
      <form
        className="flex flex-col gap-4 md:gap-[26px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            className="hidden peer"
            {...register("public")}
          />
          <MdCheckBoxOutlineBlank className="peer-checked:hidden text-2xl text-richblack-500 cursor-pointer" />
          <MdCheckBox className="[&:not(peer-checked)]:hidden peer-checked:inline text-2xl text-richblack-500 cursor-pointer" />
          <p className="text-richblack-400 font-medium">
            Make this Course Public
          </p>
        </label>
        <div className="flex justify-end gap-3 md:gap-5 flex-wrap">
          <button
            onClick={goBack}
            disabled={loading}
            className="rounded-lg md:px-6 md:py-3 px-4 py-2 flex gap-2 items-center bg-richblack-600 shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] text-richblack-5 font-medium"
          >
            <MdNavigateBefore />
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg md:px-6 md:py-3 px-4 py-2 flex gap-2 items-center bg-yellow-100 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] text-richblack-900 font-medium"
          >
            Save and Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishSection;
