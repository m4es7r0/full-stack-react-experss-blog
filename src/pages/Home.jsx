import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { useGetPostsQuery } from "../redux/api/api";
import { useSelector } from "react-redux";

export const Home = () => {
  const userData = useSelector(({ auth }) => auth.user);

  const {
    data: posts,
    error: postsError,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetPostsQuery(undefined, { refetchOnMountOrArgChange: true });

  const copy = posts?.slice();
  const sorted = copy?.sort((a, b) =>
    Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1
  );

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
          {isErrorPosts && !posts && <h2>{postsError.error}</h2>}
          {isLoadingPosts
            ? [...Array(3)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : sorted?.map((p) => (
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
                  isEditable={userData?._id === p.user._id}
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock />
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