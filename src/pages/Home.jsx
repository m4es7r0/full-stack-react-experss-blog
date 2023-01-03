import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

import { CommentsBlock } from "../components";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useMUITheme } from "../hooks/materialTheme";
import useSortPost from "../hooks/sortPostBy";
import { useGetPostsQuery } from "../redux/api/api";

export const Home = () => {
  const matches = useMUITheme("md");

  const { tagName } = useParams();
  const userData = useSelector(({ auth }) => auth.user);
  const coments = useSelector(({ posts }) => posts.coments);

  const {
    data: posts = [],
    error: postsError,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetPostsQuery(undefined, { refetchOnMountOrArgChange: true });

  const { sortedPosts, sortByPopular, setSortByPopular } = useSortPost(
    posts,
    tagName
  );

  const sertedComents = coments
    .slice()
    .sort((a, b) =>
      Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1
    );

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sortByPopular ? 1 : 0}
        aria-label="basic tabs example"
      >
        <Tab label="New" onClick={() => setSortByPopular(false)} />
        <Tab label="Popular" onClick={() => setSortByPopular(true)} />
      </Tabs>
      <Grid container={matches} spacing={2.5}>
        <Grid xs={7.5} item>
          {!matches ? <TagsBlock /> : null}
          {isErrorPosts && <h2>{postsError.error}</h2>}
          {isLoadingPosts
            ? [...Array(1)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : sortedPosts?.map((p) => (
                <Post
                  key={p._id}
                  id={p._id}
                  title={p.title}
                  imageUrl={p.imageUrl}
                  user={p.user}
                  createdAt={new Date(p.createdAt).toDateString()}
                  viewsCount={p.viewsCount}
                  comentsCount={p.comentsCount}
                  tags={p.tags}
                  isEditable={userData?._id === p.user._id}
                />
              ))}
        </Grid>
        <Grid xs={4.5} item>
          {matches ? <TagsBlock /> : null}
          <CommentsBlock items={sertedComents.slice(0, 5)} />
        </Grid>
      </Grid>
    </>
  );
};
