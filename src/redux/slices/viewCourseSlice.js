import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};

export const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData(state, action) {
      state.courseSectionData = action.payload;
    },
    setCourseData(state, action) {
      state.courseData = action.payload;
    },
    setCompletedLectures(state, action) {
      state.completedLectures = action.payload;
    },
    setTotalNoOfLectures(state, action) {
      state.totalNoOfLectures = action.payload;
    },
    updateCompletedLecture(state, action) {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
    markAllCompletedLectures(state, action) {
      const course = action.payload;
      course.courseContent.forEach((content) => {
        content.subSections.forEach((subSection) => {
          if (!state.completedLectures.includes(subSection._id))
            state.completedLectures.push(subSection._id);
        });
      });
    },
  },
});

export const {
  setCompletedLectures,
  setCourseData,
  setCourseSectionData,
  setTotalNoOfLectures,
  updateCompletedLecture,
  markAllCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
