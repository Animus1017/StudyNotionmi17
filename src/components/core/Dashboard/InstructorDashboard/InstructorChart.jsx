import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");
  const getRandomColors = (numColors) => {
    const colors = [];
    while (numColors) {
      const color = `rgb(${Math.floor(Math.random() * 236)},${Math.floor(
        Math.random() * 236
      )},${Math.floor(Math.random() * 236)})`;
      if (colors.includes(color)) continue;
      numColors--;
      colors.push(color);
    }
    return colors;
  };

  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Students Enrolled",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Income Generated",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Fixed typo from maintamaintainAspectRatio
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          padding: 10,
          font: { size: 12 },
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="p-4 md:p-6 flex flex-col gap-4 xl:gap-6 rounded-lg bg-richblack-800 flex-grow">
      <div className="flex flex-col gap-2">
        <h4 className="text-richblack-25 font-bold text-lg">Productivity</h4>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`font-medium ${
              currChart === "students"
                ? "bg-richblack-700 text-yellow-50 "
                : "text-yellow-50/70"
            } transition-all duration-200 px-3 py-1`}
            onClick={() => setCurrChart("students")}
          >
            Students
          </button>
          <button
            className={`font-medium ${
              currChart === "income"
                ? "bg-richblack-700 text-yellow-50 "
                : "text-yellow-50/70"
            } transition-all duration-200 px-3 py-1 `}
            onClick={() => setCurrChart("income")}
          >
            Income
          </button>
        </div>
      </div>
      <div className="">
        <Doughnut
          data={
            currChart === "students" ? chartDataForStudents : chartDataForIncome
          }
          options={options}
          className="w-full h-full mx-auto"
        />
      </div>
    </div>
  );
};

export default InstructorChart;
