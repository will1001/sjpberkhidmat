// endpoint artikel
// https://api.sjpberkhidmat.id/user/articles?page=1

import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "../../API/axiosFetch";

const initialState = {
  artikel: [],
  loading: true,
};

export const artikelSlice = createSlice({
  name: "artikel",
  initialState,
  reducers: {
    getArtikel: async (state, action) => {
      const data = await axiosFetch("get", "user/articles?page=1");
      console.log(state);
      // state.kabupaten.push("data?.data[0]");
    },
  },
});

export const { getArtikel } = artikelSlice.actions;

export default artikelSlice.reducer;
