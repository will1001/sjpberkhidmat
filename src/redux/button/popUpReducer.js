import { createSlice } from "@reduxjs/toolkit";

const initialState = { button: { name: "", change: "", title: "", button: "" } };

export const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    setButton: (state, action) => {
      state.button.change = action.payload.change;
      state.button.name = action.payload.name;
      state.button.title = action.payload.title;
      state.button.button = action.payload.button;
    },
  },
});

export const { setButton } = buttonSlice.actions;

export default buttonSlice.reducer;
