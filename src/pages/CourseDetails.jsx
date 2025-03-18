import React, { useEffect, useRef, useState } from "react";
import { buyCourse } from "../services/operations/paymentAPI";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { fetchCourseById } from "../services/operations/CourseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import RatingStars from "../components/common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { formatDateToMonthYear } from "../services/formatDatetoMonthYear";
import { MdOutlineUpdate } from "react-icons/md";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import Footer from "../components/common/Footer";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import Modal from "../components/common/Modal";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { convertDurationToReadable } from "../utils/secToDuration";
import ReviewSlider from "../components/common/ReviewSlider";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const heightRef = useRef(null);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [totalLectures, setTotalLectures] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [backgroundHeight, setBackgroundHeight] = useState(0); // New state for background height

  const handleActive = (id) => {
    setIsActive(
      isActive.includes(id)
        ? isActive.filter((active) => active !== id)
        : isActive.concat([id])
    );
  };

  const handleBuyCourse = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase the course",
      btn1: {
        text: "Login",
        action: () => {
          navigate("/login");
        },
      },
      btn2: {
        text: "Cancel",
        action: () => {
          setConfirmationModal(null);
        },
      },
    });
  };

  const TRUNCATE_LENGTH = 25;

  async function fetchCourse() {
    setLoading(true);
    const res = await fetchCourseById(courseId);
    if (res) {
      setResponse(res);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(response?.course?.ratingAndReview);
    setAvgRating(count);
    let lectures = 0;
    response?.course?.courseContent.forEach((content) => {
      lectures += content.subSections.length;
    });
    setTotalLectures(lectures);

    // Update background height when response changes
    if (heightRef.current) {
      const height = heightRef.current.offsetHeight;
      setBackgroundHeight(height);
    }
  }, [response]);

  // Handle window resize or dynamic content changes
  useEffect(() => {
    const updateHeight = () => {
      if (heightRef.current) {
        const height = heightRef.current.offsetHeight;
        setBackgroundHeight(height);
      }
    };

    // Initial height update
    updateHeight();

    // Add resize listener
    window.addEventListener("resize", updateHeight);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [response]); // Re-run when response changes to ensure content is loaded

  if (paymentLoading) return <Spinner />;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative">
          {/* upper bg */}
          <div
            className="absolute inset-0 bg-richblack-800 z-0"
            style={{ height: `${backgroundHeight}px` }} // Use state for dynamic height
          ></div>

          <div className="w-11/12 max-w-maxContent mx-auto flex gap-6 relative z-10">
            {/* left details */}
            <div className="flex flex-col w-full md:w-8/12">
              {/* basic details section */}
              <div className="py-8 flex gap-6" ref={heightRef}>
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-richblack-300 cursor-pointer">
                    <Link to="/">Home</Link> /{" "}
                    <span onClick={() => navigate(-1)}>Learning /</span>{" "}
                    <Link className="text-yellow-50 font-medium">
                      {response?.course?.courseCategory?.name}
                    </Link>
                  </p>
                  <img
                    src={response?.course?.courseThumbnail}
                    alt={`course-${response?.course?.courseName}`}
                    className=" h-60 sm:h-80 md:h-96 object-cover rounded-lg inline-block md:hidden"
                  />
                  <h2 className="text-richblack-5 font-medium text-3xl">
                    {response?.course?.courseName}
                  </h2>
                  <p className="text-richblack-200 text-sm">
                    {response?.course?.courseDescription.split(" ").length >
                    TRUNCATE_LENGTH
                      ? response?.course?.courseDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : response?.course?.courseDescription}
                  </p>
                  {/* ratings */}
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="font-semibold text-yellow-100 text-lg">
                      {avgRating || 0}
                    </span>
                    <RatingStars Review_Count={avgRating} />
                    <span className="text-richblack-25">
                      ({response?.course?.ratingAndReview.length} ratings)
                    </span>
                    <span className="text-richblack-25">
                      ({response?.course?.courseStudents.length} students)
                    </span>
                  </div>
                  <p className="text-richblack-25">
                    Created by {response?.course?.courseInstructor?.firstName}{" "}
                    {response?.course?.courseInstructor?.lastName}
                  </p>
                  <div className="flex items-center gap-3 text-richblack-25 flex-wrap">
                    <span className="flex items-center gap-2">
                      <BiInfoCircle className="text-lg" />
                      Created at{" "}
                      {formatDateToMonthYear(response?.course?.createdAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <MdOutlineUpdate className="text-lg" /> Last Updated{" "}
                      {formatDateToMonthYear(response?.course?.updatedAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <HiOutlineGlobeAlt className="text-lg" />{" "}
                      {response?.course?.language}
                    </span>
                  </div>
                </div>
                <div className="w-[1px] h-full bg-richblack-700 hidden md:inline-block"></div>
              </div>
              <div className=" py-8 inline-block md:hidden">
                <CourseDetailsCard
                  course={response?.course}
                  setConfirmationModal={setConfirmationModal}
                  handleBuyCourse={handleBuyCourse}
                  duration={
                    convertDurationToReadable(response?.totalDuration) || 0
                  }
                />
              </div>
              {/* what you will learn */}
              <div className="py-6">
                <div className="border border-richblack-700 flex flex-col gap-6 p-3 md:p-5 lg:p-8">
                  <h3 className="text-richblack-5 text-3xl font-medium">
                    What you'll learn
                  </h3>
                  <div className="flex flex-col gap-2 text-richblack-50 font-medium text-sm">
                    {response?.course?.whatYouWillLearn
                      .split("\n")
                      .map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                  </div>
                </div>
              </div>
              <div className="py-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-richblack-5 font-semibold text-2xl">
                    Course content
                  </h2>
                  <div className="flex justify-between flex-wrap">
                    <p className="text-richblack-50 text-sm flex gap-2">
                      {response?.course?.courseContent?.length} sections{" "}
                      <span className="text-richblack-5">•</span>
                      {totalLectures} lectures{" "}
                      <span className="text-richblack-5">•</span>{" "}
                      {response?.totalDuration} total length
                    </p>
                    <button
                      className="text-yellow-50 text-sm font-medium"
                      onClick={() => setIsActive([])}
                    >
                      Collapse all sections
                    </button>
                  </div>
                </div>
                <div>
                  {response?.course?.courseContent.map((content, index) => (
                    <CourseAccordionBar
                      content={content}
                      key={index}
                      isActive={isActive}
                      handleActive={handleActive}
                    />
                  ))}
                </div>
              </div>
              <div className="py-4 flex flex-col gap-4">
                <h4 className="text-richblack-5 font-semibold text-2xl">
                  Author
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src={response?.course?.courseInstructor?.image}
                    alt={`instructr-${response?.course?.courseInstructor?.firstName}`}
                    className="object-cover w-[52px] aspect-square rounded-full"
                  />
                  <span className="text-richblack-5 font-medium">
                    {response?.course?.courseInstructor?.firstName}{" "}
                    {response?.course?.courseInstructor?.lastName}
                  </span>
                </div>
                <p className="text-richblack-50 text-sm">
                  {response?.course?.courseInstructor?.additionalDetails?.about}
                </p>
              </div>
            </div>
            <div className=" py-8 md:inline-block hidden">
              <CourseDetailsCard
                course={response?.course}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
                duration={
                  convertDurationToReadable(response?.totalDuration) || 0
                }
              />
            </div>
          </div>
          <ReviewSlider />
          <Footer />
        </div>
      )}
      {confirmationModal && (
        <Modal {...confirmationModal} setHandler={setConfirmationModal} />
      )}
    </div>
  );
};

export default CourseDetails;
