import { createSlice } from "@reduxjs/toolkit";
import axiosFetch from "../API/axiosFetch";

const initialState = {
  kabupaten: [],
  kecamatan: [],
  kelurahan: [],
  loading: true,
};

export const wilayahSlice = createSlice({
  name: "wilayah",
  initialState,
  reducers: {
    getKabupaten: async (state, action) => {
      const data = await axiosFetch("get", "user/kabupaten?filter=lombok");
      console.log(state);
      // state.kabupaten.push("data?.data[0]");
    },
  },
});

export const { getKabupaten } = wilayahSlice.actions;

export default wilayahSlice.reducer;
