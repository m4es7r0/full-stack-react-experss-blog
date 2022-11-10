import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: "posts",
      }),
      providesTags: ['Posts']
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: ['Posts']
    }),
    getTags: build.query({
      query: () => ({
        url: "tags",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useGetTagsQuery } = api;

export default api;
