import React, { useState } from "react";
import {
  MdAddCircleOutline,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  editSection,
} from "../../../../../services/operations/CourseDetailsAPI";
import NestedView from "./NestedView";
const CourseBuilder = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editSectionId, setEditSectionId] = useState(null);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  function handleCancelEdit() {
    setEditSectionId(null);
    setValue("sectionName", "");
  }
  function goBack() {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  function goNext() {
    if (!course?.courseContent?.length) {
      toast.error("Please add at least one section to proceed");
      return;
    }
    if (
      course?.courseContent.some((section) => section.subSections.length === 0)
    ) {
      toast.error("Please add at least one subsection to each section");
      return;
    }
    dispatch(setStep(3));
  }
  function editSectionHandler(sectionId, sectionName) {
    if (editSectionId === sectionId) {
      handleCancelEdit();
      return;
    }
    setEditSectionId(sectionId);
    setValue("sectionName", sectionName);
  }
  async function onSubmit(data) {
    setLoading(true);
    let result;
    if (editSectionId) {
      result = await editSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionId,
          courseId: course._id,
        },
        token
      );
    } else
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id },
        token
      );

    if (result) {
      dispatch(setCourse(result));
      setEditSectionId(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }
  return (
    <div className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-4 md:gap-[26px] border border-richblack-700 w-full">
      <h2 className="font-semibold text-richblack-5 text-2xl">
        Course Builder
      </h2>
      {course?.courseContent.length > 0 && (
        <NestedView editSectionHandler={editSectionHandler} />
      )}
      <form
        className="flex flex-col gap-4 md:gap-[26px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
            Section Name<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            className="rounded-lg p-3 bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] text-richblack-200 font-medium outline-none"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
          />
          {course?.courseContent.length === 0 && errors.sectionName && (
            <span className="-mt-1 text-xs text-pink-200">
              Section name is required**
            </span>
          )}
        </label>
        <div className="flex gap-3 items-end">
          <button
            type="submit"
            className="border border-yellow-50 md:px-6 px-4 md:py-3 py-2 rounded-lg flex gap-2 items-center text-yellow-50 w-fit "
          >
            <MdAddCircleOutline className="text-lg" />{" "}
            {editSectionId ? "Edit Section Name" : "Create Section"}
          </button>
          {editSectionId && (
            <button
              className="text-richblack-300 underline text-sm "
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      <div className="flex justify-end gap-3 md:gap-5">
        <button
          onClick={goBack}
          disabled={loading}
          className="rounded-lg md:px-6 px-4 md:py-3 py-2 flex gap-2 items-center bg-richblack-600 shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] text-richblack-5 font-medium"
        >
          <MdNavigateBefore />
          Back
        </button>
        <button
          onClick={goNext}
          disabled={loading}
          className="rounded-lg md:px-6 px-4 md:py-3 py-2 flex gap-2 items-center bg-yellow-100 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] text-richblack-900 font-medium"
        >
          Next
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
