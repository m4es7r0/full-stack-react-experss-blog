import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  tags: [],
  sortByPopular: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSortByPopular: (state, action) => {
      state.sortByPopular = action.payload;
    },
  },
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
export const {
  setSortByPopular
} =postsSlice.actions
