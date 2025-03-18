import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadForm from "../UploadForm";
import { useForm } from "react-hook-form";
import {
  createSubSection,
  editSubSection,
} from "../../../../../services/operations/CourseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCourse } from "../../../../../redux/slices/courseSlice";
const LectureModal = ({
  modalData,
  setHandler,
  add = false,
  edit = false,
  view = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== modalData.title ||
      currentValues.description !== modalData.description ||
      currentValues.videoUrl !== modalData.videoUrl
    )
      return true;
    return false;
  };
  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        console.log(currentValues);

        const formData = new FormData();
        formData.append("courseId", course?._id);
        formData.append("subSectionId", modalData._id);
        if (currentValues.title !== modalData.title)
          formData.append("title", currentValues.title);
        if (currentValues.description !== modalData.description)
          formData.append("description", currentValues.description);
        if (currentValues.videoUrl !== modalData.videoUrl)
          formData.append("videoFile", currentValues.videoUrl);

        setLoading(true);
        const response = await editSubSection(formData, token);

        if (response) {
          dispatch(setCourse(response));
        }
        setHandler(null);
        setLoading(false);
      } else toast.error("No changes made to the form");
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course?._id);
    formData.append("sectionId", modalData);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoUrl);
    setLoading(true);
    const response = await createSubSection(formData, token);

    if (response) {
      dispatch(setCourse(response));
    }
    setLoading(false);
    setHandler(null);
  };
  useEffect(() => {
    if (edit || view) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("videoUrl", modalData.videoUrl);
    }
  }, []);
  return (
    <div className="fixed inset-0 bg-white/10 flex items-center justify-center backdrop-blur-sm z-[1000] overflow-y-auto w-screen h-screen py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="rounded-lg border overflow-hidden border-richblack-600 w-[98%] sm:w-11/12 md:w-4/5 lg:w-3/5 2xl:w-2/5 my-auto">
        <div className="border-b border-richblack-600 px-4 md:px-6 py-2 md:py-4 flex gap-3 items-center justify-between bg-richblack-700">
          <h2 className="text-richblack-5 font-semibold text-lg">
            {add && "Adding"} {edit && "Editing"} {view && "Saving"} Lecture
          </h2>
          <button
            disabled={loading}
            onClick={() => (loading ? null : setHandler(null))}
            className="text-richblack-50 text-2xl"
          >
            <RxCross2 />
          </button>
        </div>
        <form
          className="p-4 sm:p-6 md:p-8 bg-richblack-800 flex flex-col gap-4 md:gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <UploadForm
            name="videoUrl"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData?.videoUrl : null}
            editData={edit ? modalData?.videoUrl : null}
          />
          <label className="flex flex-col gap-[6px]">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Lecture Title{!view && <sup className="text-pink-200">*</sup>}
            </p>
            <input
              type="text"
              disabled={view}
              className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              placeholder="Enter Lecture Title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="-mt-1 text-xs text-pink-200">
                Lecture title is required**
              </span>
            )}
          </label>
          <label className="flex flex-col gap-[6px]">
            <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
              Lecture Description
              {!view && <sup className="text-pink-200">*</sup>}
            </p>
            <textarea
              disabled={view}
              rows={5}
              className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
              placeholder="Enter Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="-mt-1 text-xs text-pink-200">
                Lecture description is required**
              </span>
            )}
          </label>
          {!view && (
            <div className="flex justify-end gap-5">
              <button
                className="md:py-3 py-2 md:px-6 px-4 rounded-lg flex gap-2 bg-richblack-600 text-richblack-5 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] items-center"
                disabled={loading}
                onClick={() => setHandler(null)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="md:py-3 py-2 md:px-6 px-4 rounded-lg flex gap-2 bg-yellow-50 text-richblack-900 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] items-center"
              >
                {edit
                  ? loading
                    ? "Saving Changes..."
                    : "Save Changes"
                  : loading
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LectureModal;
