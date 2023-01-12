import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "",
  timeId: null,
};

const notificationSlice = createSlice({
  name: "notifaction",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return { ...state, notification: action.payload };
    },
    clearNotification: (state, action) => {
      return { ...state, notification: "" };
    },
    setTimeId: (state, action) => {
      return { ...state, timeId: action.payload };
    },
  },
});

export const { setNotification, clearNotification, setTimeId } =
  notificationSlice.actions;
export default notificationSlice.reducer;
