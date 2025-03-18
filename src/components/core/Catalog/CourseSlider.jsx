import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CourseCard from "./CourseCard";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
const CourseSlider = ({ courses, active = 0, diffBest = null }) => {
  console.log(courses);
  // State to track if we're at the start or end
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Handle Swiper events
  const handleSwiper = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Update state on slide change
  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <div>
      {courses.length ? (
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            onSwiper={handleSwiper} // Initial setup
            onSlideChange={handleSlideChange} // Update on slide change
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              // Tailwind md: 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // Tailwind lg: 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
            {courses.map((course, index) => (
              <SwiperSlide key={course?._id}>
                <CourseCard
                  course={course}
                  height="h-56"
                  best={
                    (active === 1 && index === 0) || diffBest === course._id
                  }
                  hot={active === 3 && index === 0}
                  neww={active === 2 && index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`custom-prev absolute top-1/2 -left-0 lg:-left-10 xl:left-[-50px] transform -translate-y-1/2 bg-richblack-600 text-richblack-5 p-2 rounded-full hover:bg-richblack-400 transition-all duration-200 z-10 ${
              isBeginning ? "hidden" : ""
            }`}
          >
            <FaAngleLeft />
          </button>
          <button
            className={`custom-next absolute top-1/2 -right-0 lg:-right-10 xl:-right-[50px] transform -translate-y-1/2 bg-richblack-600 text-richblack-5 p-2 rounded-full hover:bg-richblack-400 transition-all duration-200 z-10 ${
              isEnd ? "hidden" : ""
            }`}
          >
            <FaAngleRight />
          </button>
        </div>
      ) : (
        <p className="text-richblack-100 text-xl">No courses found</p>
      )}
    </div>
  );
};

export default CourseSlider;
