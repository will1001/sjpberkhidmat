import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchDataWilayah = createAsyncThunk("dataWilayah/fetchDataWilayah", () => {
  return axios.get("http://localhost:5000/wilayah").then((res) => res.data);
});

const dataWilayah = createSlice({
  name: "dataWilayah",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDataWilayah.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataWilayah.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchDataWilayah.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error;
    });
  },
});

export default dataWilayah.reducer;
