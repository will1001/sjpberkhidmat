import { configureStore } from "@reduxjs/toolkit";
import dataDesa from "./features/API/dataDesa";
import dataWilayahReducer from "./features/API/dataWilayahSlice";
import dataKabupatenReducer from "./features/API/getKabupaten";

const store = configureStore({
  reducer: {
    dataWilayah: dataWilayahReducer,
    dataKabupaten: dataKabupatenReducer,
    dataDesa: dataDesa,
  },
});

export default store;
