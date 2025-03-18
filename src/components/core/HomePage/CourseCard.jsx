import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`${
        cardData.heading === currentCard
          ? "bg-white shadow-[12px_12px_0px_0px_#FFD60A]"
          : "bg-richblack-800"
      } cursor-pointer w-[341px] h-[300px] flex flex-col justify-between`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className="px-6 py-8 flex flex-col gap-3">
        <h2
          className={`text-xl font-semibold ${
            currentCard === cardData.heading
              ? "text-richblack-800"
              : "text-richblack-25"
          } `}
        >
          {cardData.heading}
        </h2>
        <p
          className={`font-normal ${
            currentCard === cardData.heading
              ? "text-richblack-500"
              : "text-richblack-400"
          }`}
        >
          {cardData.description}
        </p>
      </div>
      <div
        className={`flex gap-4 px-6 py-4 justify-between border-t border-dashed ${
          cardData.heading === currentCard
            ? "border-richblack-50"
            : "border-richblack-600"
        } `}
      >
        <div className={`flex gap-2 items-center`}>
          <HiMiniUsers
            className={`${
              cardData.heading === currentCard
                ? "text-blue-300"
                : "text-richblack-400"
            } text-[17px]`}
          />
          <p
            className={`${
              cardData.heading === currentCard
                ? "text-blue-500"
                : "text-richblack-300"
            } font-medium`}
          >
            {cardData.level}
          </p>
        </div>
        <div className={`flex gap-2 items-center`}>
          <ImTree
            className={`${
              cardData.heading === currentCard
                ? "text-blue-300"
                : "text-richblack-400"
            } text-[17px]`}
          />
          <p
            className={`${
              cardData.heading === currentCard
                ? "text-blue-500"
                : "text-richblack-300"
            } font-medium`}
          >
            {cardData.lessionNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
