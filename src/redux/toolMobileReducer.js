import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: "",
};

export const toolMobileSlice = createSlice({
  name: "toolMobile",
  initialState,
  reducers: {
    setToolMobile: (state, action) => {
      state.tool = action.payload.tool;
    },
  },
});

export const { setToolMobile } = toolMobileSlice.actions;
export default toolMobileSlice.reducer;
