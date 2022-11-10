import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { useGetPostsQuery, useGetTagsQuery } from "../redux/api/api";

export const Home = () => {
  const {
    data: posts,
    error: postsError,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetPostsQuery();

  const {
    data: tags,
    error: tagsError,
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useGetTagsQuery();

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoadingPosts
            ? [...Array(3)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : posts?.map((p) => (
                <Post
                  key={p._id}
                  id={p._id}
                  title={p.title}
                  imageUrl={p.imageUrl}
                  user={p.user}
                  createdAt={new Date(p.createdAt).toDateString()}
                  viewsCount={p.viewsCount}
                  commentsCount={0}
                  tags={p.tags}
                  isEditable
                />
              ))}
          {isErrorPosts && <h2>{postsError.error}</h2>}
        </Grid>
        <Grid xs={4} item>
          {isLoadingTags ? (
            <TagsBlock isLoading={true} />
          ) : (
            <TagsBlock
              items={tags}
              isLoading={isLoadingTags}
            />
          )}
          {isErrorTags && <h2>{tagsError.error}</h2>}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
