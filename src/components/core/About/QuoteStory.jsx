import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import foundingstory from "../../../assets/Images/FoundingStory.png";
const QuoteStory = () => {
  return (
    <div className="flex flex-col w-full">
      {/* quote */}
      <div className="max-w-maxContent w-11/12 mx-auto py-8 md:py-16 lg:py-[90px] ">
        <p className="text-3xl md:text-4xl font-semibold leading-[52px] text-richblack-100 text-center xl:whitespace-nowrap w-full">
          <span className="inline-block align-top">
            <FaQuoteLeft className="text-xl text-richblack-600" />
          </span>{" "}
          We are passionate about revolutionizing the way we learn. Our <br />
          innovative platform{" "}
          <span className="inline-block">
            <HighlightText text="combines technology" />
          </span>{" "}
          ,{" "}
          <span className="bg-[linear-gradient(117.83deg,#FF512F_-4.8%,#F09819_107.46%)] bg-clip-text text-transparent">
            expertise
          </span>
          , and community to <br /> create an{" "}
          <span className="bg-[linear-gradient(118.41deg,#E65C00_-6.05%,#F9D423_106.11%)] bg-clip-text text-transparent">
            unparalleled educational experience.
          </span>{" "}
          <span className="inline-block align-top">
            <FaQuoteRight className="text-xl text-richblack-600" />
          </span>
        </p>
      </div>
      {/* border */}
      <div className="bg-richblack-700 h-[1px] w-screen relative left-0"></div>
      {/* founding story */}
      <div className="max-w-maxContent w-11/12 mx-auto flex gap-8 md:gap-16 lg:gap-[98px] py-8 md:py-16 lg:py-[90px] items-center flex-grow lg:flex-row flex-col">
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-semibold leading-[44px] bg-[linear-gradient(117.95deg,#833AB4_-2.4%,#FD1D1D_52.25%,#FCB045_106.89%)] bg-clip-text text-transparent">
            Our Founding Story
          </h2>
          <div className="flex flex-col gap-4 font-medium text-richblack-300">
            <p>
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
        </div>
        <div className="p-0 lg:p-8 w-full lg:w-1/2 relative">
          <img
            src={foundingstory}
            alt="foundingstory"
            className="border-4 [border-image-source:linear-gradient(121.74deg,rgba(255,255,255,0.22)_-7.75%,rgba(255,255,255,0)_37.38%)] relative z-10 mx-auto"
          />
          <div className="absolute bg-[linear-gradient(118.47deg,#EC008C_-0.91%,#FC6767_104.91%)] opacity-20 w-full h-full rounded-full blur-3xl top-0 z-0 -left-[10%] "></div>
        </div>
      </div>
      {/* mission vision */}
      <div className="max-w-maxContent w-11/12 mx-auto flex gap-8 md:gap-16 lg:gap-[98px] py-8 md:py-16 lg:py-[90px] justify-between lg:flex-row flex-col">
        <div className="flex flex-col gap-3 lg:gap-6 w-full lg:w-[43%]">
          <h2 className="font-semibold text-3xl lg:text-4xl leading-[44px] bg-[linear-gradient(118.41deg,#E65C00_-6.05%,#F9D423_106.11%)] bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-richblack-300 font-medium">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:gap-6 w-full lg:w-[43%]">
          <h2 className="font-semibold text-3xl lg:text-4xl leading-[44px]">
            <HighlightText text="Our Mission" />
          </h2>
          <p className="text-richblack-300 font-medium">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteStory;
