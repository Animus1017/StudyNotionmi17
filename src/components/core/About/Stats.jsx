import React from "react";
const stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const Stats = () => {
  return (
    <div className="bg-richblack-800 border-b border-richblack-700">
      <div className=" py-8 md:py-16 lg:py-[90px] max-w-maxContent w-11/12 mx-auto flex gap-[10px] justify-center xl:justify-between flex-wrap">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 items-center py-5 lg:py-0 px-20 "
          >
            <p className="font-bold text-3xl text-richblack-5">{stat.count}</p>
            <p className="text-richblack-500 font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
