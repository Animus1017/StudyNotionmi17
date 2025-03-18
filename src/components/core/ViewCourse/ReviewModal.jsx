import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../../services/operations/CourseDetailsAPI";
import { setCourseData } from "../../../redux/slices/viewCourseSlice";

const ReviewModal = ({ setReviewModal }) => {
  const { token } = useSelector((state) => state.auth);
  const { courseData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      review: "",
    },
  });
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const currRating = watch("rating");

  const onSubmit = async (data) => {
    setLoading(true);

    const response = await createRating(
      { courseId: courseData?._id, rating: data.rating, review: data.review },
      token
    );
    if (response) {
      setCourseData(response);
    }
    setReviewModal(false);
    setLoading(false);
  };

  const handleRatingChange = (newRating) => {
    setValue("rating", newRating);
  };

  useEffect(() => {
    setValue("rating", 0);
    setValue("review", "");
  }, [setValue]);

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-[1000] w-screen h-screen grid place-items-center">
      <div className="rounded-lg border overflow-hidden border-richblack-600 w-11/12 md:w-3/4 lg:w-1/2 xl:w-[36%] my-auto">
        <div className="border-b border-richblack-25 px-4 md:px-6 py-4 flex gap-3 items-center justify-between bg-richblack-700">
          <h2 className="text-richblack-5 font-semibold text-lg">Add Review</h2>
          <button
            disabled={loading}
            onClick={() => setReviewModal(false)}
            className="text-richblack-50 text-2xl"
          >
            <RxCross2 />
          </button>
        </div>
        <div className="p-4 md:p-6 lg:p-8 bg-richblack-800 flex flex-col gap-4 md:gap-6">
          <div className="flex gap-3 items-center self-center">
            <img
              src={user?.image}
              alt={`review-${user?.firstName}`}
              className="w-[52px] aspect-square rounded-full object-cover"
            />
            <div className="flex flex-col gap-[2px]">
              <p className="text-richblack-5 font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-5 text-sm">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-6 lg:gap-8"
          >
            <div className="flex flex-col gap-4 md:gap-6 items-center">
              <ReactStars
                size={24}
                count={5}
                color="#dbddea"
                activeColor="#e7c009"
                a11y={true}
                isHalf={true}
                value={currRating}
                onChange={handleRatingChange}
                edit={!loading}
              />
              <label className="flex flex-col gap-[6px] w-full">
                <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
                  Add Your Experience
                  <sup className="text-pink-200">*</sup>
                </p>
                <textarea
                  rows={5}
                  className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
                  placeholder="Share details of your own experience for this course"
                  {...register("review", { required: true })}
                />
                {errors.review && (
                  <span className="-mt-1 text-xs text-pink-200">
                    Course Review is required**
                  </span>
                )}
              </label>
            </div>
            <div className="flex justify-end gap-5">
              <button
                className="py-2 md:py-3 px-4 md:px-6 rounded-lg flex gap-2 bg-richblack-600 text-richblack-5 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] items-center"
                disabled={loading}
                onClick={() => setReviewModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="py-2 md:py-3 px-4 md:px-6 rounded-lg flex gap-2 bg-yellow-50 text-richblack-900 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] items-center"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
