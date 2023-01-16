import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const base_url = "https://api.sjpberkhidmat.id/";

export const fetchArtikel = createAsyncThunk("dataArtikel/fetchArtikel", () => {
  return axios.get(base_url + "user/articles?page=1").then((res) => res.data);
});

const dataArtikel = createSlice({
  name: "dataArtikel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArtikel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtikel.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchArtikel.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error;
    });
  },
});

export default dataArtikel.reducer;
