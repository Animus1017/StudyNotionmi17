import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementsField = ({
  label,
  name,
  placeholder,
  errors,
  register,
  setValue,
}) => {
  const [instruction, setInstruction] = useState("");
  const [instructionsList, setInstructionsList] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course);
  function handleAdd(e) {
    e.preventDefault();
    if (instruction.trim()) {
      setInstructionsList([...instructionsList, instruction]);
      setInstruction("");
    }
  }
  function handleClear(index) {
    const updatedInstructions = [...instructionsList];
    updatedInstructions.splice(index, 1);
    setInstructionsList(updatedInstructions);
  }
  useEffect(() => {
    if (editCourse) {
      setInstructionsList(course?.instructions);
    }
    register(name, {
      required: "Instructions are required**",
      validate: (value) =>
        value.length > 0 ? true : "Instructions are required**",
    });
  }, []);
  useEffect(() => {
    setValue(name, instructionsList);
  }, [instructionsList]);
  return (
    <label className="flex flex-col gap-[6px] w-full">
      <p className="flex gap-[2px] text-sm text-richblack-5 items-center">
        {label}
        <sup className="text-pink-200">*</sup>
      </p>

      <input
        type="text"
        className="rounded-lg p-3 outline-none bg-richblack-700 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-medium text-richblack-200"
        placeholder={placeholder}
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
      />
      <div className="flex flex-col gap-1 items-start">
        <button
          onClick={handleAdd}
          className="py-1 px-2 font-bold text-yellow-50"
        >
          Add
        </button>
        <div className="flex flex-col px-2">
          {instructionsList.length > 0 &&
            instructionsList.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center text-richblack-5"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-pure-greys-300"
                >
                  clear
                </button>
              </div>
            ))}
        </div>
      </div>
      {errors[name] && (
        <span className="-mt-1 text-xs text-pink-200">
          {errors[name].message}
        </span>
      )}
    </label>
  );
};

export default RequirementsField;
