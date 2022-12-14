import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  selectedPosts: {},
  sortByPopular: false,
  tags: [],
  coments: [],
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
        const tmp = new Set(action.payload);
        state.tags = Array.from(tmp);
      })
      .addMatcher(api.endpoints.getComent.matchFulfilled, (state, action) => {
        state.coments = action.payload;
      })
      .addMatcher(api.endpoints.getPostById.matchFulfilled, (state, action) => {
        state.selectedPosts[action.payload._id] = action.payload;
      });
  },
});

export const selectPost = (state, id) => state.posts.selectPost[id];

export default postsSlice.reducer;
export const { setSortByPopular } = postsSlice.actions;
