import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mern-blog-preview.herokuapp.com/",
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem("token");
      if (token) headers.set("Authorization", token);
      return headers;
    },
  }),
  tagTypes: ["Posts", "Post"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: `/posts`,
      }),
      providesTags: ["Posts"],
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: ["Post"],
    }),
    makePost: build.mutation({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
    }),
    updatePost: build.mutation({
      query: (data) => ({
        url: `posts/${data.id}`,
        method: "PATCH",
        body: data.patch,
      }),
      invalidatesTags: ["Post"]
    }),
    removePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
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
      transformResponse: (data) => {
        return data.url.replace("/", "");
      },
    }),
    removeFile: build.mutation({
      query: (body) => ({
        url: "upload-remove",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  usePrefetch,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useGetTagsQuery,
  useLoginUserMutation,
  useLazyAuthMeQuery,
  useRegisterMutation,
  useMakePostMutation,
  useRemovePostMutation,
  useUploadFileMutation,
  useUpdatePostMutation,
  useRemoveFileMutation,
} = api;

export default api;
