import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popUpDashType: null,
  idPeriode: "6cea57ca-725e-4bbb-84b5-7ccc88f0cd51",
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    showOrHidePopUpDash: (state, action) => {
      state.popUpDashType = action.payload.type;
    },
    setIdPeriode: (state, action) => {
      state.idPeriode = action.payload.idPeriode;
    },
  },
});

export const { showOrHidePopUpDash, setIdPeriode } = panelSlice.actions;

export default panelSlice.reducer;
