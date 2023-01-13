import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  change: "",
};

export const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    setButton: (state, action) => {
      state.change = action.payload.change;
      state.name = action.payload.name;
    },
  },
});

export const { setButton } = buttonSlice.actions;

export default buttonSlice.reducer;
