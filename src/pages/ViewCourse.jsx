import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  fetchCourseById,
  fetchFullCourseDetails,
} from "../services/operations/CourseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompletedLectures,
  setCourseData,
  setCourseSectionData,
  setTotalNoOfLectures,
  updateCompletedLecture,
} from "../redux/slices/viewCourseSlice";
import ViewCourseSidebar from "../components/core/ViewCourse/ViewCourseSidebar";
import ReviewModal from "../components/core/ViewCourse/ReviewModal";
import Spinner from "../components/common/Spinner";

const ViewCourse = () => {
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  async function fetchCourse() {
    setLoading(true);
    const res = await fetchFullCourseDetails({ courseId: courseId }, token);
    dispatch(setCourseData(res?.course));
    dispatch(setCourseSectionData(res?.course?.courseContent));
    dispatch(setCompletedLectures(res?.completedVideos));
    let lecture = 0;
    res?.course?.courseContent.forEach((sec) => {
      lecture += sec?.subSections?.length;
    });
    dispatch(setTotalNoOfLectures(lecture));
    setLoading(false);
  }
  useEffect(() => {
    fetchCourse();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, updateCompletedLecture]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="h-full flex relative">
      <div className={`${expand ? "absolute z-[100]" : "static"}   h-full `}>
        <ViewCourseSidebar
          setReviewModal={setReviewModal}
          expand={expand}
          setExpand={setExpand}
        />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
