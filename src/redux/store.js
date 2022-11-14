import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react'

import api from "./api/api";
import posts from "./slices/posts";
import auth from "./slices/auth";

import authMiddleware from "./authMiddleware";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    posts,
    auth,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(api.middleware, authMiddleware),
  ],
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch)

export default store;
