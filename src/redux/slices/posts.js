import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  selectedPosts: {},
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
    builder
      .addMatcher(api.endpoints.getTags.matchFulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addMatcher(api.endpoints.getPostById.matchFulfilled, (state, action) => {
        state.selectedPosts[action.payload._id] = action.payload
      });
  },
});

export const selectPost = ((state, id) => state.posts.selectPost[id])

export default postsSlice.reducer;
export const { setSortByPopular } = postsSlice.actions;
