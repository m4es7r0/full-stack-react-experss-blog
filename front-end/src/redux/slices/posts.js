import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  tags: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getTags.matchFulfilled,
      (state, action) => {
        state.tags = action.payload;
      }
    );
  },
});

export default postsSlice.reducer;
