// endpoint artikel
// https://api.sjpberkhidmat.id/user/articles?page=1

import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "../../API/axiosFetch";

const initialState = {
  artikel: {
    dataEdit: [],
  },
};

export const editArtikelSlice = createSlice({
  name: "editArtikel",
  initialState,
  reducers: {
    editArtikel: (state, action) => {
      state.artikel.dataEdit = action.payload;
    },
  },
});

export const { editArtikel } = editArtikelSlice.actions;

export default editArtikelSlice.reducer;
