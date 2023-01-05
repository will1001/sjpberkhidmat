import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  namaDesa: "",
  data: [],
};

export const fetchDataDesa = createAsyncThunk("dataDesa/fetchDetailDesa", () => {
  return axios.get("http://localhost:5000/desa").then((res) => res.data);
});

const detailDesa = createSlice({
  name: "detailDesa",
  initialState,
});
