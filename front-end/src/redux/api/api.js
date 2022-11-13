import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem("token");
      if (token) headers.set("Authorization", token);
      return headers;
    },
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: "posts",
      }),
      providesTags: ["Posts"],
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: ["Posts"],
    }),
    makePost: build.mutation({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
    }),
    getTags: build.query({
      query: () => ({
        url: "tags",
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    authMe: build.query({
      query: () => "auth/me",
    }),
    register: build.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    uploadFile: build.mutation({
      query: (body) => ({
        url: "upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetTagsQuery,
  useLoginUserMutation,
  useLazyAuthMeQuery,
  useRegisterMutation,
  useUploadFileMutation,
  useMakePostMutation,
} = api;

export default api;
