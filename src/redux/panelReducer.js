import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popUpDashType: null,
  idPeriode: "6cea57ca-725e-4bbb-84b5-7ccc88f0cd51",
  editData: null,
  formType: null,
  tabPanelRelawanDash: "relawan",
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
    setEditData: (state, action) => {
      const data = JSON.parse(action.payload.editData);
      state.editData = data;
    },
    setFormType: (state, action) => {
      state.formType = action.payload.formType;
    },
    setTabPanelRelawanDash: (state, action) => {
      state.tabPanelRelawanDash = action.payload.tabPanelRelawanDash;
    },
  },
});

export const {
  showOrHidePopUpDash,
  setIdPeriode,
  setEditData,
  setFormType,
  setTabPanelRelawanDash,
} = panelSlice.actions;

export default panelSlice.reducer;
