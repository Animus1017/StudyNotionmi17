import React from "react";
import { TbArrowRight } from "react-icons/tb";
import HighlightText from "../components/core/HomePage/HighlightText";
import { useNavigate } from "react-router-dom";
import Button from "../components/core/HomePage/Button";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import Instructor from "../components/core/HomePage/Instructor";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* section1 */}
      <div className="w-11/12 max-w-maxContent mx-auto text-pure-greys-5 flex flex-col items-center">
        <div className="flex flex-col gap-[38px] md:gap-14">
          {/* hero */}
          <div className="flex flex-col items-center justify-between gap-9">
            <button
              onClick={() => navigate("/signup")}
              className="flex gap-[10px] py-[6px] px-[18px] items-center bg-richblack-800 text-richblack-200 font-medium rounded-full transition-all duration-200 hover:scale-95 border-richblack-800 border-2 hover:bg-richblack-900 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] 
"
            >
              Become an Instructor <TbArrowRight />
            </button>
            <div className="flex flex-col gap-4 items-center">
              <h2 className=" font-semibold text-3xl md:text-4xl">
                Empower Your Future with{" "}
                <HighlightText text={"Coding Skills"} />
              </h2>
              <p className="text-richblack-300 font-medium w-full md:w-9/12 text-left md:text-center">
                With our online coding courses, you can learn at your own pace,
                from anywhere in the world, and get access to a wealth of
                resources, including hands-on projects, quizzes, and
                personalized feedback from instructors.{" "}
              </p>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Button active={true} linkto="/signup">
                Learn More
              </Button>
              <Button linkto="/login">Book a Demo</Button>
            </div>
          </div>
          {/* video */}
          <div className="relative">
            <div
              className={`animate-pulse opacity-20 absolute w-full h-full rounded-full blur-3xl bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)]  z-0`}
            ></div>
            <div className="relative z-10">
              <video
                src={banner}
                loop
                autoPlay
                muted
                className="h-full w-full md:shadow-[20px_20px_0px_0px_#F5F5F5] shadow-[8px_8px_0px_0px_#F5F5F5]"
              />
            </div>
          </div>
        </div>
        {/* codeblocks */}
        <div>
          <CodeBlocks
            position="flex-row"
            heading={
              <h3 className="text-3xl md:text-4xl font-semibold">
                Unlock your <HighlightText text="coding potential" /> with our
                online courses.
              </h3>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            btn1={{
              active: true,
              linkto: "/signup",
              text: "Try it Yourself",
            }}
            btn2={{
              active: false,
              linkto: "/login",
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>StudyNotion</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Welcome</a></h1>\n<p>Welcome to StudyNotion</p>\n</body>\n</html>`}
            bgGradient="bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)]"
            codeColor="text-yellow-25"
          />
          <CodeBlocks
            position="flex-row-reverse"
            heading={
              <h3 className="text-3xl md:text-4xl font-semibold">
                Start <HighlightText text={`coding \n in seconds`} />
              </h3>
            }
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            btn1={{
              active: true,
              linkto: "/signup",
              text: "Continue Lesson",
            }}
            btn2={{
              active: false,
              linkto: "/login",
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>StudyNotion</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Learn</a></h1>\n<p>Learn with StudyNotion</p>\n</body>\n</html>`}
            bgGradient="bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)]"
            codeColor="text-richblack-50"
          />
        </div>
        {/* explore more section*/}
        <div className="w-full">
          <ExploreMore />
        </div>
      </div>
      {/* section2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <TimelineSection />
        <LearningLanguageSection />
      </div>
      {/* section3 */}
      <div className="w-11/12 max-w-maxContent mx-auto text-richblack-5 flex flex-col items-center">
        <Instructor />
      </div>
      <ReviewSlider />
      <Footer />
    </div>
  );
};

export default Home;
