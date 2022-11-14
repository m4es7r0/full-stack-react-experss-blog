import React from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useLazyGetPostByIdQuery } from "../redux/api/api";

const useGetSelectedPosts = (setFields) => {
  const { postId } = useParams();
  const post = useSelector((state) => state.posts.selectedPosts[postId]);

  const [getPost] = useLazyGetPostByIdQuery();

  React.useEffect(() => {
    if (postId) {
      // if post has been selected
      if (post) {
        const { imageUrl, text, title, tags } = post;
        setFields({
          imageByUrl: imageUrl || "",
          value: text,
          title: title,
          tags: tags.join(", ") || "",
        });
      }
      // if no-one post has been selected
      else {
        getPost(postId).then(({ data }) => {
          setFields({
            imageByUrl: data.imageUrl || "",
            value: data.text,
            title: data.title,
            tags: data.tags.join(", ") || "",
          });
        });
      }
    }
  }, []);

  return { postId };
};

export default useGetSelectedPosts;
