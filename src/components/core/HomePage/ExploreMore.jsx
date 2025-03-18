import React, { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import Button from "./Button";
import { TbArrowRight } from "react-icons/tb";
const tagName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tagName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className="py-8 md:py-16 lg:py-[90px] relative w-full">
      <div className="home_bg absolute bg-pure-greys-5 z-0 w-[200%] h-2/5 bg-contain bottom-0 left-[-50%]"></div>
      <div className="flex flex-col gap-16 items-center relative z-10 w-full">
        {/* heading and tabs */}
        <div className="flex flex-col gap-5 md:gap-9 items-center w-full">
          {/* heading */}
          <div className="flex flex-col gap-2 items-center w-full">
            <h2 className=" font-semibold text-3xl md:text-4xl text-richblack-5">
              Unlock the <HighlightText text={"Power of Code"} />
            </h2>
            <p className="text-richblack-300 font-medium ">
              Learn to Build Anything You Can Imagine
            </p>
          </div>
          {/* tabs */}
          <div className="flex flex-wrap items-center justify-center gap-[5px] p-1 rounded-full bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] mx-auto w-fit">
            {tagName.map((tag, index) => (
              <button
                key={index}
                className={`py-[6px] px-[18px] font-medium ${
                  currentTab === tag
                    ? "text-richblack-5 bg-richblack-900"
                    : "text-richblack-200"
                } rounded-3xl transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5`}
                onClick={() => setCards(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        {/* cards */}
        <div className="flex gap-9 justify-center w-full flex-wrap">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              cardData={course}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
        {/* buttons */}
        <div className="flex gap-3 md:gap-5 lg:gap-6">
          <Button active={true} linkto="/signup">
            <div className="flex items-center gap-2">
              Explore Full Catalog
              <TbArrowRight />
            </div>
          </Button>
          <Button active={false} linkto="/login">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
