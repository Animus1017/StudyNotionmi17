import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Modal = ({ text1, text2, btn1, btn2, setHandler }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setHandler(false);
  });
  return (
    <div className="fixed inset-0 bg-white/10 grid place-items-center backdrop-blur-sm z-[1000]">
      <div
        className="p-6 bg-richblack-900 border border-richblack-400 rounded-lg flex flex-col gap-8 w-fit"
        ref={ref}
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl text-richblack-5 font-semibold">{text1}</h2>
          <p className="text-richblack-200">{text2}</p>
        </div>
        <div className="flex gap-6">
          <button
            className={`rounded-lg font-medium py-3 px-6 transition-all duration-200 hover:scale-95 bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]`}
            onClick={btn1.action}
          >
            {btn1.text}
          </button>
          <button
            className="w-fit rounded-lg font-medium py-3 px-6 transition-all duration-200 hover:scale-95 text-richblack-5 bg-richblack-600 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]"
            onClick={btn2.action}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
