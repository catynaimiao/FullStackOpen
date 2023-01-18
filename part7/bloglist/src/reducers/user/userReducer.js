import { createSlice } from "@reduxjs/toolkit";

const initialUsers = [];

const userSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
