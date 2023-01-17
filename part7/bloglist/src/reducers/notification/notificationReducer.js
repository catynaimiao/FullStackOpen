/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const initialNotification = {
  type: null,
  text: "",
  timeId: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    setNotification(state, action) {
      const { type, text } = action.payload;
      return { ...state, type, text };
    },
    clearNotification(state, action) {
      return { ...initialNotification, timeId: state.timeId };
    },
    setTimeId(state, action) {
      return { ...state, timeId: action.payload };
    },
  },
});

export const { setNotification, clearNotification, setTimeId } =
  notificationSlice.actions;
export default notificationSlice.reducer;
