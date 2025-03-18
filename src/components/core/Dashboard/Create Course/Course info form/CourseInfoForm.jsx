import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  createCourse,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/CourseDetailsAPI";
import ChipInput from "./ChipInput";
import UploadForm from "../UploadForm";
import { useDispatch, useSelector } from "react-redux";
import RequirementsField from "./RequirementsField";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import languages from "../../../../../data/language.json";
const CourseInfoForm = () => {
  const { course, editCourse } = useSelector((state) => state.course);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  // Watch the courseCategory field to make the select controlled
  const selectedCategory = watch("courseCategory");
  const selectedLanguage = watch("language");
  // Fetch categories
  async function getCategories() {
    setLoading(true);
    const response = await fetchCourseCategories();
    if (response?.length) {
      setCourseCategories(response);
    }
    setLoading(false);
  }

  // Check if form has updates
  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseName !== course?.courseName ||
      currentValues.courseDescription !== course?.courseDescription ||
      currentValues.coursePrice !== course?.coursePrice ||
      currentValues.courseCategory !== course?.courseCategory?._id ||
      currentValues.courseTags.toString() !== course?.courseTags.toString() ||
      currentValues.courseThumbnail !== course?.courseThumbnail ||
      currentValues.instructions.toString() !==
        course?.instructions.toString() ||
      currentValues.whatYouWillLearn !== course?.whatYouWillLearn ||
      currentValues.language !== course?.language
    );
  };

  // Submit handler
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseName !== course?.courseName)
          formData.append("courseName", data.courseName);
        if (currentValues.courseDescription !== course?.courseDescription)
          formData.append("courseDescription", data.courseDescription);
        if (currentValues.coursePrice !== course?.coursePrice)
          formData.append("coursePrice", data.coursePrice);
        if (currentValues.courseCategory !== course?.courseCategory?._id)
          formData.append("courseCategory", data.courseCategory);
        if (currentValues.courseTags.join(",") !== course?.courseTags.join(","))
          formData.append("courseTags", JSON.stringify(data.courseTags));
        if (currentValues.courseThumbnail !== course?.courseThumbnail)
          formData.append("thumbnailImage", data.courseThumbnail);
        if (
          currentValues.instructions.toString() !==
          course?.instructions.toString()
        )
          formData.append("instructions", JSON.stringify(data.instructions));
        if (currentValues.whatYouWillLearn !== course?.whatYouWillLearn)
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
        if (currentValues.language !== course?.language)
          formData.append("language", data.language);
        setLoading(true);
        const response = await editCourseDetails(formData, token);
        setLoading(false);
        if (response) {
          dispatch(setStep(2));
          dispatch(setCourse(response));
          dispatch(setEditCourse(false));
        }
      } else {
        toast.error("No changes made to the course");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("coursePrice", data.coursePrice);
    formData.append("courseCategory", data.courseCategory);
    formData.append("courseTags", JSON.stringify(data.courseTags));
    formData.append("thumbnailImage", data.courseThumbnail);
    formData.append("instructions", JSON.stringify(data.instructions));
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("language", data.language);
    setLoading(true);
    const response = await createCourse(formData, token);
    if (response) {
      dispatch(setStep(2));
      dispatch(setCourse(response));
    }
    setLoading(false);
  };

  // Fetch categories and set form values
  useEffect(() => {
    getCategories();
  }, []);

  // Set form values when editing, after categories are loaded
  useEffect(() => {
    if (editCourse && course && courseCategories.length > 0) {
      console.log("Editing course:", course);
      console.log("Categories:", courseCategories);
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("coursePrice", course.coursePrice);
      setValue("courseCategory", course.courseCategory?._id); // Set category ID
      setValue("courseTags", course.courseTags);
      setValue("courseThumbnail", course.courseThumbnail);
      setValue("instructions", course.instructions);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("language", course.language);
    }
  }, [editCourse, course, courseCategories, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-richblack-800 rounded-lg p-4 md:p-6 flex flex-col gap-4 md:gap-[26px] border border-richblack-700 w-full"
    >
      <label className="flex flex-col gap-[6px]">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
          Course Title<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
          placeholder="Enter Course Title"
          {...register("courseName", { required: true })}
        />
        {errors.courseName && (
          <span className="-mt-1 text-xs text-pink-200">
            Course name is required**
          </span>
        )}
      </label>
      <label className="flex flex-col gap-[6px]">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
          Course Short Description<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          rows={5}
          className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
          placeholder="Enter Description"
          {...register("courseDescription", { required: true })}
        />
        {errors.courseDescription && (
          <span className="-mt-1 text-xs text-pink-200">
            Course description is required**
          </span>
        )}
      </label>
      <label className="flex flex-col gap-[6px]">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
          Price<sup className="text-pink-200">*</sup>
        </p>
        <div className="flex gap-4 items-center rounded-lg p-3 bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200">
          <HiOutlineCurrencyRupee className="text-lg" />
          <input
            type="number"
            className="outline-none bg-richblack-700 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
            placeholder="Enter Price"
            {...register("coursePrice", {
              required: true,
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
            })}
          />
        </div>
        {errors.coursePrice && (
          <span className="-mt-1 text-xs text-pink-200">
            Course price is required**
          </span>
        )}
      </label>
      <label className="flex flex-col gap-[6px] max-w-full">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
          Category<sup className="text-pink-200">*</sup>
        </p>
        <select
          {...register("courseCategory", { required: true })}
          value={selectedCategory || ""} // Controlled value
          onChange={(e) => setValue("courseCategory", e.target.value)} // Update form state
          className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {loading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : (
            courseCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          )}
        </select>
        {errors.courseCategory && (
          <span className="-mt-1 text-xs text-pink-200">
            Course category is required**
          </span>
        )}
      </label>
      <ChipInput
        name="courseTags"
        register={register}
        placeholder="Enter Tags and press Enter"
        label="Course Tags"
        errors={errors}
        setValue={setValue}
        setError={setError}
        clearErrors={clearErrors}
      />
      <UploadForm
        name="courseThumbnail"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.courseThumbnail : null}
      />
      <label className="flex flex-col gap-[6px]">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
          Benefits of the course<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          rows={5}
          className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
          placeholder="Enter Benefits of the course"
          {...register("whatYouWillLearn", { required: true })}
        />
        {errors.whatYouWillLearn && (
          <span className="-mt-1 text-xs text-pink-200">
            Course Benefits is required**
          </span>
        )}
      </label>
      <RequirementsField
        label="Requirements/Instructions"
        name="instructions"
        register={register}
        errors={errors}
        placeholder="Add Requirements/Instructions"
        setValue={setValue}
      />
      <label className="flex flex-col gap-[6px] w-full">
        <p className="flex gap-[2px] text-sm text-richblack-5 items-center w-full">
          Language<sup className="text-pink-200">*</sup>
        </p>
        <select
          {...register("language", {
            required: true,
          })}
          value={selectedLanguage || ""} // Controlled value
          onChange={(e) => setValue("language", e.target.value)} // Update form state
          className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200 w-full"
        >
          <option value="" disabled>
            Choose a Language
          </option>
          {languages.map((language, index) => (
            <option key={index} value={language.name}>
              {language.code}-{language.name}
            </option>
          ))}
        </select>
        {errors.language && (
          <span className="-mt-1 text-xs text-pink-200">
            Language is required**
          </span>
        )}
      </label>

      <div className="flex justify-between flex-wrap gap-3 md:gap-5">
        <button
          className="md:py-3 md:px-6 py-2 px-4 rounded-lg flex gap-1 sm:gap-2 bg-richblack-600 text-richblack-5 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] items-center"
          disabled={loading}
          onClick={() => navigate(-1)}
        >
          <MdNavigateBefore />
          Back
        </button>
        <div className="flex flex-wrap gap-3 md:gap-5">
          {editCourse && (
            <button
              className="md:py-3 md:px-6 py-2 px-4 rounded-lg flex gap-1 sm:gap-2 bg-richblack-600 text-richblack-5 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] items-center"
              disabled={loading}
              onClick={() => {
                dispatch(setStep(2));
                dispatch(setEditCourse(false));
              }}
            >
              Continue without saving
              <MdNavigateNext />
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="md:py-3 md:px-6 py-2 px-4 rounded-lg flex gap-1 sm:gap-2 bg-yellow-50 text-richblack-900 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] items-center"
          >
            {editCourse ? "Save Changes" : "Next"}
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseInfoForm;
