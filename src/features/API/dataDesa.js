import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchDataDesa = createAsyncThunk("dataDesa/fetchDataDesa", () => {
  return axios.get("http://localhost:5000/desa").then((res) => res.data);
});

const dataDesa = createSlice({
  name: "dataWilayah",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDataDesa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataDesa.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchDataDesa.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error;
    });
  },
});

export default dataDesa.reducer;
