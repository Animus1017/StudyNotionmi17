import React from "react";
import Button from "./Button";
import { TbArrowRight } from "react-icons/tb";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  codeblock,
  bgGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex flex-col ${position} py-8 md:py-16 lg:py-[90px] gap-6 md:gap-0 md:justify-around md:items-center`}
    >
      {/* static elements */}
      <div className="w-full lg:w-2/5 flex flex-col gap-9 md:gap-11 lg:gap-16">
        <div className="flex flex-col gap-3">
          {heading}
          <p className="font-medium text-richblack-300">{subheading}</p>
        </div>
        {/* buttons */}
        <div className="flex gap-3 md:gap-5 lg:gap-6">
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className="flex items-center gap-2">
              {btn1.text}
              <TbArrowRight />
            </div>
          </Button>
          <Button active={btn2.active} linkto={btn2.linkto}>
            {btn2.text}
          </Button>
        </div>
      </div>
      {/* running code */}
      <div className=" group w-full lg:w-[35%] flex text-sm relative font-bold m-0 md:m-4 lg:m-8 p-2 gap-2 bg-[linear-gradient(111.93deg,rgba(14,26,45,0.24)_-1.4%,rgba(17,30,50,0.38)_104.96%)] border-4 [border-image-source:linear-gradient(121.74deg,rgba(255,255,255,0.22)_-7.75%,rgba(255,255,255,0)_37.38%)] backdrop-blur-3xl">
        <div
          className={`opacity-20 -rotate-0 absolute w-full h-full rounded-full blur-3xl ${bgGradient} -top-[10%] -left-[10%] animate-pulse`}
        ></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-[-150%] w-[30%] h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] skew-x-[45deg] transition-all duration-1000 ease-out group-hover:left-[150%]"></div>
        </div>
        <div className="text-richblack-400 leading-[22px]">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p className="block md:hidden">12</p>
        </div>
        <div className={`${codeColor} font-mono`}>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              lineHeight: `22px`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
