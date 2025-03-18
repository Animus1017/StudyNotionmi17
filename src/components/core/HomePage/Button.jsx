import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ active, children, linkto }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`rounded-lg font-medium px-5 py-3 md:px-6 transition-all duration-200 hover:scale-95 ${
        active
          ? "bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]"
          : "bg-richblack-800 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]"
      } `}
      onClick={() => navigate(linkto)}
    >
      {children}
    </button>
  );
};

export default Button;
