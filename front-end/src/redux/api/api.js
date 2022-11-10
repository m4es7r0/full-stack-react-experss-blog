import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: "posts",
      }),
    }),
    getTags: build.query({
      query: () => ({
        url: "tags"
      })
    })
  }),
});

export const { useGetPostsQuery, useGetTagsQuery } = api;

export default api;
