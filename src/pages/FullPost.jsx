import React from "react";

import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../redux/api/api";
import { useSelector } from "react-redux";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const { postId } = useParams();
  const coments = useSelector(({ posts }) => posts.coments);
  const userData = useSelector(({ auth }) => auth.user);

  const { data, isLoading, isError, error } = useGetPostByIdQuery(postId);

  const isHasComent = coments.filter((obj) => obj.postId === postId);

  return (
    <>
      {isError ? (
        <h2>{error.error}</h2>
      ) : (
        <>
          {isLoading ? (
            <Post isLoading={isLoading} />
          ) : (
            <Post
              id={data._id}
              title={data.title}
              imageUrl={data.imageUrl}
              user={data.user}
              createdAt={new Date(data.createdAt).toDateString()}
              viewsCount={data.viewsCount}
              comentsCount={data.comentsCount}
              tags={data.tags}
              isEditable={data.user._id === userData?._id}
              isFullPost
            >
              <ReactMarkdown children={data.text} />
            </Post>
          )}
          <CommentsBlock items={isHasComent} isLoading={false}>
            <Index postId={postId} />
          </CommentsBlock>
        </>
      )}
    </>
  );
};
