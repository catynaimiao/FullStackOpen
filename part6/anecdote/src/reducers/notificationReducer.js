import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifactionSlice = createSlice({
  name: "notifaction",
  initialState,
  reducers: {
    setNotifaction: (state, action) => {
      return action.payload;
    },
    removeNotifaction: (state, action) => {
      return "";
    },
  },
});

export const { setNotifaction, removeNotifaction } = notifactionSlice.actions;
export default notifactionSlice.reducer;
