import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  editCourse: false,
  course: null,
  paymentLoading: false,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep(state, value) {
      state.step = value.payload;
    },
    setEditCourse(state, value) {
      state.editCourse = value.payload;
    },
    setCourse(state, value) {
      state.course = value.payload;
    },
    setPaymentLoading(state, action) {
      state.paymentLoading = action.payload;
    },
    resetCourse(state) {
      state.step = 1;
      state.editCourse = false;
      state.course = null;
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  resetCourse,
  setPaymentLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
