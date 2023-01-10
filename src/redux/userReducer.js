import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  token2: "adasd",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
