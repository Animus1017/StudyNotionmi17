import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { convertSecondsToDuration } from "../../../../utils/secToDuration";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("progress");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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

  const chartDataForProgress = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Progress Percentage",
        data: courses.map((course) => course.progressPercentage),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const chartDataForTimeSpent = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Time Spent",
        data: courses.map((course) => course.timeSpent),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${convertSecondsToDuration(value)}`;
          },
        },
      },
    },
  };

  const optionsBar = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false, // Fixed typo
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          padding: 10,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
      title: {
        display: true,
        text: currChart === "progress" ? "Course Progress" : "Time Spent",
        color: "white",
        font: { size: 14 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Progress Percentage",
          color: "white",
          font: { size: 12 },
        },
        ticks: {
          color: "white",
          autoSkip: false,
          font: { size: 10 },
          callback: (value) => `${value}%`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Courses",
          color: "white",
          font: { size: 12 },
        },
        ticks: {
          color: "white",
          font: { size: 10 },
          autoSkip: false,
          padding: 8,
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    // Dynamic bar thickness based on screen size and number of bars
    datasets: {
      bar: {
        barPercentage: 0.8, // Controls the width of bars relative to the category width
        categoryPercentage: 0.9, // Controls the space between bars
        maxBarThickness: isSmallScreen ? 30 : 50, // Maximum thickness to prevent overlap
        minBarThickness: 10, // Minimum thickness for visibility
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4 xl:gap-6 rounded-lg bg-richblack-800 flex-grow">
      <div className="flex flex-col gap-2">
        <h4 className="text-richblack-25 font-bold text-lg">Productivity</h4>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`font-medium ${
              currChart === "progress"
                ? "bg-richblack-700 text-yellow-50 "
                : "text-yellow-50/70"
            } transition-all duration-200 px-3 py-1`}
            onClick={() => setCurrChart("progress")}
          >
            Progress Percentage
          </button>
          <button
            className={`font-medium ${
              currChart === "time"
                ? "bg-richblack-700 text-yellow-50 "
                : "text-yellow-50/70"
            } transition-all duration-200 px-3 py-1`}
            onClick={() => setCurrChart("time")}
          >
            Time Spent
          </button>
        </div>
      </div>
      <div className="w-full h-[350px] md:h-full">
        {currChart === "progress" && (
          <Bar
            data={chartDataForProgress}
            options={optionsBar}
            className="w-full h-full mx-auto"
          />
        )}
        {currChart === "time" && (
          <Doughnut
            data={chartDataForTimeSpent}
            options={options}
            className="w-full h-full mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default StudentChart;
