import React from "react";

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="rounded-full p-1 flex gap-[5px] bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] w-fit">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-richblack-900 text-richblack-5"
              : "text-richblack-200"
          } font-medium py-[6px] px-[18px] rounded-full`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
};

export default Tab;
