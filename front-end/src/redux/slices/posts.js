import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {
    items: [],
    statusLoading: "loading",
  },
  tags: {
    items: [],
    statusLoading: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

  }
});

export default postsSlice.reducer