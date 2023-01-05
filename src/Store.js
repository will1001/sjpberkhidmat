import { configureStore } from "@reduxjs/toolkit";
import dataDesa from "./features/API/dataDesa";
import dataWilayahReducer from "./features/API/dataWilayahSlice";

const store = configureStore({
  reducer: {
    dataWilayah: dataWilayahReducer,
    dataDesa: dataDesa,
  },
});

export default store;
