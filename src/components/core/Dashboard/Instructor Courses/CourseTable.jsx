import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";
import { FaClock, FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../../../services/formatData";
import { getTotalDuration } from "../../../../services/getTotalDuration";
import { HiMiniPencil } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/CourseDetailsAPI";
import Modal from "../../../common/Modal";

const CourseTable = ({ courses, setCourses }) => {
  const TRUNCATE_LENGTH = 8;
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  async function handleDeleteCourse(courseId) {
    setLoading(true);
    const formData = new FormData();
    formData.append("courseId", courseId);
    await deleteCourse(formData, token);
    const response = await fetchInstructorCourses(token);
    if (response.length) setCourses(response);
    setLoading(false);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-richblack-800 my-3">
      <Table className="w-full">
        <Thead className="border-b border-richblack-800 bg-richblack-700">
          <Tr>
            <Th>
              <p className="p-2 md:p-4 text-start w-full uppercase text-richblack-100 text-sm font-medium">
                Courses
              </p>
            </Th>
            <Th>
              <p className="p-2 md:p-4 w-full text-start sm:text-center uppercase text-richblack-100 text-sm font-medium">
                Duration
              </p>
            </Th>
            <Th>
              <p className="p-2 md:p-4 w-full text-start sm:text-center uppercase text-richblack-100 text-sm font-medium">
                Price
              </p>
            </Th>
            <Th>
              <p className="p-2 md:p-4 w-full text-start sm:text-center uppercase text-richblack-100 text-sm font-medium">
                Actions
              </p>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length ? (
            courses.map((course, index) => (
              <Tr key={index} className="w-full">
                <Td className="p-2 md:p-4">
                  <div className="flex gap-3 md:gap-6 lg:flex-row flex-col">
                    <img
                      src={course?.courseThumbnail}
                      alt={`course-${course.courseName}`}
                      className="object-contain bg-richblack-5 rounded-lg w-[221px] h-[148px]"
                    />
                    <div className="flex flex-col gap-3 items-start">
                      <h4 className="font-semibold text-xl text-richblack-5">
                        {course?.courseName}
                      </h4>
                      <p className="text-sm text-richblack-100">
                        {course?.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? `${course?.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ")}...`
                          : course?.courseDescription}
                      </p>
                      <div className="flex gap-1 flex-col">
                        <p className="text-xs font-medium text-richblack-25">
                          Created: {formatDate(course?.createdAt)}
                        </p>
                        <p className="text-xs font-medium text-richblack-25">
                          Last Updated: {formatDate(course?.updatedAt)}
                        </p>
                      </div>
                      {course?.status === COURSE_STATUS.DRAFT ? (
                        <p className="bg-richblack-700 py-[2px] px-2 rounded-full flex gap-[6px] items-center font-medium text-xs text-pink-100">
                          <FaClock className="text-pink-50 text-base" /> Drafted
                        </p>
                      ) : (
                        <p className="bg-richblack-700 py-[2px] px-2 rounded-full flex gap-[6px] items-center text-xs font-medium text-yellow-100">
                          <FaCheckCircle className="text-yellow-50 text-base" />{" "}
                          Published
                        </p>
                      )}
                    </div>
                  </div>
                </Td>
                <Td className="p-0">
                  <p className="p-2 md:p-4 text-sm font-medium text-richblack-100 text-center w-full h-full flex items-center justify-center">
                    {getTotalDuration(course)}
                  </p>
                </Td>
                <Td className="p-0">
                  <p className="p-2 md:p-4 text-richblack-100 text-sm font-medium text-center w-full h-full flex items-center justify-center">
                    ₹ {course?.coursePrice}
                  </p>
                </Td>
                <Td className="p-0">
                  <div className="p-2 md:p-4 text-richblack-400 text-xl w-full h-full flex justify-center items-center gap-[10px]">
                    <button
                      disabled={loading}
                      className="hover:scale-110 hover:text-caribbeangreen-300 transition-all duration-200"
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                    >
                      <HiMiniPencil />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1: {
                            text: "Delete",
                            action: !loading
                              ? () => {
                                  handleDeleteCourse(course._id);
                                  setConfirmationModal(null);
                                }
                              : () => {},
                          },
                          btn2: {
                            text: "Cancel",
                            action: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          },
                        })
                      }
                      className="hover:scale-110 hover:text-[#ff0000] transition-all duration-200"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4">
                <p className="py-4 sm:py-6 md:py-8 lg:py-10 text-center text-2xl font-medium text-richblack-100 w-full h-full flex justify-center items-center">
                  No Courses Found
                </p>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      {confirmationModal && (
        <Modal {...confirmationModal} setHandler={setConfirmationModal} />
      )}
    </div>
  );
};

export default CourseTable;
