import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const base_url = "https://api.sjpberkhidmat.id/";

export const fetchKabupaten = createAsyncThunk(
  "dataKabupaten/fetchKabupaten",
  () => {
    return axios.get(base_url + "user/kabupaten").then((res) => res.data);
  }
);

const dataKabupaten = createSlice({
  name: "dataKabupaten",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchKabupaten.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchKabupaten.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchKabupaten.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error;
    });
  },
});

export default dataKabupaten.reducer;
