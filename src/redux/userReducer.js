import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  roles: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
