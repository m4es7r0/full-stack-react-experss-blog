import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(api.endpoints.authMe.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const { logout, setUrlImgForRegister } = authSlice.actions;

export default authSlice.reducer;
