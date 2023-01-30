import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popUpDashType: null,
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    showOrHidePopUpDash: (state, action) => {
      state.popUpDashType = action.payload.type;
    },
  },
});

export const { showOrHidePopUpDash } = panelSlice.actions;

export default panelSlice.reducer;
