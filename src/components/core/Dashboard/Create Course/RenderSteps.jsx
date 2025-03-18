import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInfoForm from "./Course info form/CourseInfoForm";
import CourseBuilder from "./Course Builder/CourseBuilder";
import PublishSection from "./PublishSection";
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      step: 1,
      title: "Course Information",
    },
    {
      id: 2,
      step: 1.5,
    },
    {
      id: 3,
      step: 2,
      title: "Course Builder",
    },
    {
      id: 4,
      step: 2.5,
    },
    {
      id: 5,
      step: 3,
      title: "Publish",
    },
  ];
  useEffect(() => console.log(step), [step]);
  return (
    <div className="flex flex-col">
      <div className=" flex flex-col gap-4 md:gap-6 justify-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center mx-auto w-11/12 lg:w-3/5">
            {steps.map((item) =>
              item.id & 1 ? (
                <div className="" key={item.id}>
                  {step > item.step ? (
                    <div className="bg-yellow-50 grid place-items-center rounded-full w-[34px] h-[34px]">
                      <FaCheck className="" />
                    </div>
                  ) : (
                    <p
                      className={`${
                        step === item.step
                          ? "font-semibold border-yellow-50 bg-yellow-900 text-yellow-50"
                          : " bg-richblack-800 border-richblack-700 text-richblack-300"
                      } w-[34px] h-[34px] rounded-full border text-lg grid place-items-center`}
                    >
                      {item.step}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  key={item.id}
                  className={`border ${
                    step > item.step
                      ? "border-yellow-50"
                      : "border-richblack-600"
                  } border-dashed flex-grow h-[1px]`}
                ></div>
              )
            )}
          </div>
          <div className="flex mx-auto w-11/12 lg:w-3/5 justify-between">
            {steps.map((item) =>
              item.id & 1 ? (
                <p
                  key={item.id}
                  className={`${
                    step === item.step
                      ? "text-richblack-5"
                      : "text-richblack-500"
                  } text-sm`}
                >
                  {item.title}
                </p>
              ) : null
            )}
          </div>
        </div>
        {step === 1 && <CourseInfoForm />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <PublishSection />}
      </div>
    </div>
  );
};

export default RenderSteps;
