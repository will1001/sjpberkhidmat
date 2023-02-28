import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  roles: "",
  id_kabupaten: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
    setIdKabupaten: (state, action) => {
      state.id_kabupaten = action.payload.id_kabupaten;
    },
  },
});

export const { setToken, setIdKabupaten } = userSlice.actions;

export default userSlice.reducer;
