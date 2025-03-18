import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineMenu,
  AiOutlineEye,
} from "react-icons/ai";
import { HiMiniPencil } from "react-icons/hi2";

import { RxDividerVertical } from "react-icons/rx";
import { FaCaretDown, FaCaretUp, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../../../../common/Modal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/CourseDetailsAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import LectureModal from "./LectureModal";

const NestedView = ({ editSectionHandler }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addLecture, setAddLecture] = useState(null);
  const [editLecture, setEditLecture] = useState(null);
  const [viewLecture, setViewLecture] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleDeleteSection = async (sectionId) => {
    setLoading(true);
    const response = await deleteSection(
      { sectionId, courseId: course._id },
      token
    );
    if (response) {
      dispatch(setCourse(response));
    }
    setLoading(false);
  };
  const handleDeleteSubSection = async (sectionId, subSectionId) => {
    setLoading(true);
    const response = await deleteSubSection(
      {
        subSectionId: subSectionId,
        sectionId: sectionId,
        courseId: course._id,
      },
      token
    );
    if (response) {
      dispatch(setCourse(response));
    }
    setLoading(false);
  };
  return (
    <div className="bg-richblack-700 border border-richblack-600 rounded-lg px-4 md:px-6">
      <div className="flex flex-col">
        {course.courseContent.map((section, index) => (
          <details key={section._id} className="group" open>
            <summary className="flex justify-between py-2 md:py-3 gap-2 md:gap-3 border-b border-richblack-600 cursor-pointer">
              <div className="flex gap-2 items-center text-richblack-50 font-bold transition-all duration-200">
                <AiOutlineMenuFold className="group-open:hidden text-xl text-richblack-400 cursor-pointer" />
                <AiOutlineMenuUnfold className="[&:not(group-open)]:hidden group-open:inline text-xl text-richblack-400 cursor-pointer" />
                {section.sectionName}
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-richblack-400 text-xl transition-all duration-200">
                <button
                  onClick={() =>
                    editSectionHandler(section._id, section.sectionName)
                  }
                >
                  <HiMiniPencil />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "Selected section will be deleted permanently.",
                      btn1: {
                        text: "Delete",
                        action: () => {
                          handleDeleteSection(section._id);
                          setConfirmationModal(null);
                        },
                      },
                      btn2: {
                        text: "Cancel",
                        action: () => setConfirmationModal(null),
                      },
                    })
                  }
                >
                  <FaRegTrashAlt />
                </button>
                <RxDividerVertical className="text-2xl" />
                <FaCaretDown className="[&:not(group-open)]:hidden group-open:inline cursor-pointer" />
                <FaCaretUp className="group-open:hidden cursor-pointer" />
              </div>
            </summary>
            <div className="">
              {section?.subSections.map((lecture) => (
                <div
                  className="flex justify-between pl-4 md:pl-6 py-2 md:py-3 gap-2 md:gap-3 border-b border-richblack-600 "
                  key={lecture._id}
                >
                  <div className="flex gap-2 items-center text-richblack-50 font-bold">
                    <AiOutlineMenu className="text-xl text-richblack-400" />
                    {lecture.title}
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-richblack-400 text-xl transition-all duration-200">
                    <button onClick={() => setViewLecture(lecture)}>
                      <AiOutlineEye className="text-xl md:text-2xl" />
                    </button>
                    <button onClick={() => setEditLecture(lecture)}>
                      <HiMiniPencil />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Are you sure?",
                          text2:
                            "Selected lecture will be deleted permanently.",
                          btn1: {
                            text: "Delete",
                            action: () => {
                              handleDeleteSubSection(section._id, lecture._id);
                              setConfirmationModal(null);
                            },
                          },
                          btn2: {
                            text: "Cancel",
                            action: () => setConfirmationModal(null),
                          },
                        })
                      }
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="py-2 md:py-4">
                <button
                  className="flex gap-1 items-center font-medium text-yellow-50"
                  onClick={() => setAddLecture(section._id)}
                >
                  <FaPlus />
                  Add Lecture
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>
      {confirmationModal && (
        <Modal {...confirmationModal} setHandler={setConfirmationModal} />
      )}
      {addLecture && (
        <LectureModal
          modalData={addLecture}
          setHandler={setAddLecture}
          add={true}
        />
      )}
      {editLecture && (
        <LectureModal
          modalData={editLecture}
          setHandler={setEditLecture}
          edit={true}
        />
      )}
      {viewLecture && (
        <LectureModal
          modalData={viewLecture}
          setHandler={setViewLecture}
          view={true}
        />
      )}
    </div>
  );
};

export default NestedView;
