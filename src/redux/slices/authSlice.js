import { createSlice } from "@reduxjs/toolkit";
const COOKIE_NAME = process.env.REACT_APP_COOKIE_NAME || "StudyNotion";
const initialState = {
  token: localStorage.getItem(COOKIE_NAME)
    ? JSON.parse(localStorage.getItem(COOKIE_NAME))
    : null,
  loading: false,
  signupData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
      localStorage.setItem(COOKIE_NAME, JSON.stringify(value.payload));
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;

export default authSlice.reducer;
