import React from "react";

const Spinner = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] grid place-items-center">
      <div
        className="animate-spin inline-block w-16 h-16 border-8 border-current border-t-transparent text-richblack-5 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
