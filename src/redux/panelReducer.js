import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popUpDashRelawan: false,
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    showPopUpDashRelawan: (state, action) => {
      state.popUpDashRelawan = !state.popUpDashRelawan;
    },
  },
});

export const { showPopUpDashRelawan } = panelSlice.actions;

export default panelSlice.reducer;
