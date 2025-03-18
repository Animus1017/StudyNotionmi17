import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { getRatings } from "../../services/operations/ratingAPI";
import RatingStars from "./RatingStars";
import { FreeMode, Autoplay } from "swiper/modules";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const TRUNCATE_LENGTH = 30;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getRatings();
      if (response) {
        console.log(response);
        setReviews(response);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-8 md:py-16 lg:py-[90px] flex flex-col gap-8 md:gap-[52px] items-center relative">
      {/* Overlay with pointer-events-none to allow interaction */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#000814_-42.71%,rgba(0,8,20,0)_49.97%,#000814_142.64%)] z-10 pointer-events-none"></div>
      <h2 className="text-richblack-5 font-semibold text-3xl md:text-4xl relative z-20">
        Reviews from other learners
      </h2>
      {!reviews.length ? (
        <p className="text-center text-richblack-400 text-lg">
          No ratings available
        </p>
      ) : (
        <div className="w-full relative z-0">
          <Swiper
            slidesPerView={1} // Default for smallest screens
            spaceBetween={20} // Default spacing for smallest screens
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
            breakpoints={{
              // Tailwind sm: 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // Tailwind md: 768px
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              // Tailwind lg: 1024px
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-richblack-800 p-3 flex flex-col gap-2 h-[184px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt={`student-${review?.user?.firstName}`}
                      className="w-9 aspect-square rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-richblack-5 text-sm font-semibold">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </p>
                      <p className="text-richblack-600 text-xs font-medium">
                        {review?.user?.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-richblack-50 font-medium text-xs">
                    {review?.review.split(" ").length > TRUNCATE_LENGTH
                      ? review?.review
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : review?.review}
                  </p>
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-yellow-100 text-sm">
                      {review?.rating}
                    </span>
                    <RatingStars Review_Count={review?.rating} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
