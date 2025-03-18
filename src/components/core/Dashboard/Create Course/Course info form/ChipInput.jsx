import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

const ChipInput = ({
  name,
  register,
  placeholder,
  label,
  errors,
  setValue,
  setError,
  clearErrors,
}) => {
  const { course, editCourse } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newChip = e.target.value.trim();

      if (!newChip) return;

      // **Check for duplicate tag**
      if (chips.includes(newChip)) {
        setError(name, {
          type: "manual",
          message: "Tag already exists. Please enter a unique tag.",
        });
        return;
      }

      clearErrors(name);
      setChips([...chips, newChip]);
      e.target.value = "";
    }
  };
  const handleChipDelete = (index) => {
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);

    setValue(name, newChips);

    if (newChips.length === 0) {
      setError(name, {
        type: "manual",
        message: "At least one tag is required.",
      });
    } else {
      clearErrors(name);
    }
  };

  useEffect(() => {
    register(name, {
      required: "At least one tag is required.",
      validate: (value) =>
        value?.length > 0 ? true : "Please add at least one tag.",
    });

    if (editCourse) {
      setChips(course?.courseTags || []);
    }
  }, [register, name, editCourse, course]);
  useEffect(() => {
    setValue(name, chips);
  }, [chips, name, setValue]);

  return (
    <label className="flex flex-col gap-[6px] w-full pointer-events-none">
      <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
        {label}
        <sup className="text-pink-200">*</sup>
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex gap-1 items-center bg-yellow-400 px-2 py-1 rounded-full text-sm text-richblack-5 flex-wrap"
          >
            {chip}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleChipDelete(index);
              }}
              className="pointer-events-auto"
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="pointer-events-auto rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
        placeholder={placeholder}
        onKeyDown={handleOnKeyDown}
      />
      {errors[name] && (
        <span className="-mt-1 text-xs text-pink-200">
          {errors[name].message}
        </span>
      )}
    </label>
  );
};

export default ChipInput;
