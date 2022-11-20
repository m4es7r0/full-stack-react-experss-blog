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
  tagTypes: ["Posts", "Post", "Tags", "Coments"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: `posts`,
      }),
      providesTags: ["Posts"],
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: ["Post", "Coments"],
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
      invalidatesTags: ["Post", "Tags", "Coments"],
    }),
    removePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts", "Tags", "Coments"],
    }),
    getTags: build.query({
      query: () => "tags",
      providesTags: ["Tags"],
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
    getComent: build.query({
      query: () => "coment",
      providesTags: ["Coments"],
    }),
    makeComent: build.mutation({
      query: (body) => ({
        url: "coment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Coments"],
    }),
    removeComent: build.mutation({
      query: (id) => ({
        url: `coment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coments"],
    }),
    updateComent: build.mutation({
      query: (data) => ({
        url: `coment/${data.id}`,
        method: "PATCH",
        body: data.patch,
      }),
      invalidatesTags: ["Coments"],
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
  useGetComentQuery,
  useMakeComentMutation,
  useUpdateComentMutation,
  useRemoveComentMutation,
} = api;

export default api;
