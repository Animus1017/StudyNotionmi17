import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import { formattedDate } from "../../../utils/dateFormatter";
import { markLectureasCompleted } from "../../../services/operations/CourseDetailsAPI";
import { updateCompletedLecture } from "../../../redux/slices/viewCourseSlice";
import { toast } from "react-hot-toast";
const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const playerRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseData, courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((subSection) => subSection?._id === subSectionId);
    if (currentSectionIndex === 0 && currentSubsectionIndex === 0) return true;
    return false;
  };
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    const subSectionLength =
      courseSectionData?.[currentSectionIndex]?.subSections?.length;
    const currentSubsectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((subSection) => subSection?._id === subSectionId);
    if (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubsectionIndex === subSectionLength - 1
    )
      return true;
    return false;
  };
  const gotoNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    const subSectionLength =
      courseSectionData?.[currentSectionIndex]?.subSections?.length;
    const currentSubsectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((subSection) => subSection?._id === subSectionId);
    if (currentSubsectionIndex !== subSectionLength - 1) {
      const nextSubsectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubsectionIndex + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`
      );
    } else {
      const nextSectionId = courseSectionData?.[currentSectionIndex + 1]?._id;
      const nextSubsectionId =
        courseSectionData?.[currentSectionIndex + 1]?.subSections?.[0]?._id;
      console.log(nextSubsectionId);

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
      );
    }
  };
  const gotoPrevVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((subSection) => subSection?._id === subSectionId);
    if (currentSubsectionIndex !== 0) {
      const prevSubsectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubsectionIndex - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`
      );
    } else {
      const prevSectionId = courseSectionData?.[currentSectionIndex - 1]?._id;
      const prevSubsectionId =
        courseSectionData?.[currentSectionIndex - 1]?.subSections?.[
          courseSectionData[currentSectionIndex - 1]?.subSections?.length - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubsectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    setLoading(true);
    const response = await markLectureasCompleted(
      { subSectionId: subSectionId, courseId: courseId },
      token
    );
    if (response) {
      dispatch(updateCompletedLecture(subSectionId));
    }
    setLoading(false);
  };
  useEffect(() => {
    (() => {
      if (!courseSectionData?.length) return;
      if (!courseId && !sectionId && !subSectionId)
        return navigate("/dashboard/enrolled-courses");
      const filteredData = courseSectionData.filter(
        (section) => section?._id === sectionId
      );
      if (!filteredData?.length) return;
      const filteredSubSectionData = filteredData[0]?.subSections.filter(
        (subSection) => subSection?._id === subSectionId
      );
      if (!filteredSubSectionData?.length) return;
      setVideoData(filteredSubSectionData[0]);
      setVideoEnded(false);
      console.log(completedLectures);
    })();
  }, [courseSectionData, courseData, location.pathname]);
  return (
    <div className="w-full lg:w-11/12">
      {!videoData ? (
        <p>No data found</p>
      ) : (
        <div className="px-4 md:px-6 flex flex-col gap-3">
          <div className="relative">
            <Player
              ref={playerRef}
              playsInline
              fluid
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >
              <BigPlayButton position="center" />
            </Player>
            {videoEnded && (
              <div className="absolute bg-[linear-gradient(to_top,rgb(0,0,0),rgba(0,0,0,0.7),rgba(0,0,0,0.5),rgba(0,0,0,0.1))] inset-0 grid place-content-center gap-4 md:gap-6 lg:gap-8 z-50">
                <div className="flex-col flex gap-3 md:gap-5 items-center">
                  {!completedLectures?.includes(subSectionId.toString()) && (
                    <button
                      disabled={loading}
                      onClick={handleLectureCompletion}
                      className="w-fit h-fit py-2 md:py-3 px-4 md:px-6 rounded-lg flex gap-2 bg-yellow-50 text-richblack-900 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] items-center"
                    >
                      {loading
                        ? "Marking as completed..."
                        : "Mark as completed"}
                    </button>
                  )}
                  <button
                    disabled={loading}
                    onClick={() => {
                      if (playerRef.current) {
                        playerRef.current.seek(0);
                        playerRef.current.play();
                        setVideoEnded(false);
                      }
                    }}
                    className="w-fit h-fit py-2 md:py-3 px-4 md:px-6 rounded-lg flex gap-2 bg-richblack-600 text-richblack-5 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] items-center"
                  >
                    Rewatch
                  </button>
                </div>
              </div>
            )}
          </div>
          {videoEnded && (
            <div className="flex gap-3 md:gap-5 justify-between items-center">
              {!isFirstVideo() && (
                <button
                  disabled={loading}
                  onClick={gotoPrevVideo}
                  className="w-fit h-fit py-2 md:py-3 px-4 md:px-6 rounded-lg flex gap-2 bg-richblack-600 text-richblack-5 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset] items-center"
                >
                  Prev
                </button>
              )}
              {!isLastVideo() && (
                <button
                  disabled={loading}
                  onClick={gotoNextVideo}
                  className="w-fit h-fit py-2 md:py-3 px-4 md:px-6 rounded-lg flex gap-2 bg-yellow-50 text-richblack-900 font-medium shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] items-center"
                >
                  Next
                </button>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h4 className="text-richblack-5 font-semibold text-2xl">
              {videoData?.title}
            </h4>

            <div className="flex flex-col gap-2 text-richblack-50 text-sm font-medium">
              {videoData?.description?.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="text-richblack-5">
              {formattedDate(courseData?.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
