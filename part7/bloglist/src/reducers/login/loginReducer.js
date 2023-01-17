/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialUser = window ? window.localStorage.getItem("user") : null;

const loginSlice = createSlice({
  name: "login",
  initialState: initialUser,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
