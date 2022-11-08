import { configureStore } from "@reduxjs/toolkit";

import api from "./api/api";
import posts from "./slices/posts";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    posts,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(api.middleware),
  ],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
