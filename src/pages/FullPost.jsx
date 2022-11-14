import React from "react";

import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../redux/api/api";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
  const { postId } = useParams();
  const { data, isLoading, isError, error } = useGetPostByIdQuery(postId);

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
              commentsCount={0}
              tags={data.tags}
              isFullPost
            >
              <ReactMarkdown children={data.text}/>
            </Post>
          )}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий 555555",
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
          >
            <Index />
          </CommentsBlock>
        </>
      )}
    </>
  );
};
