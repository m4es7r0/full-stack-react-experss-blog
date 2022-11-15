import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortByPopular as setSortByPopularForRedux } from "../redux/slices/posts";

const useSortPost = (posts) => {
  const dispatch = useDispatch()
  const isSortByPopular = useSelector(({ posts }) => posts.sortByPopular);
  const [sortByPopular, setSortByPopular] = React.useState(isSortByPopular);

  const sortedByFresh = posts?.slice().sort((a, b) =>
    Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1
  );
  const sortedByPopular = posts?.slice().sort((a, b) =>
    a.viewsCount < b.viewsCount ? 1 : -1
  );

  if (sortByPopular) {
    dispatch(setSortByPopularForRedux(true))
    return { sortedPosts: sortedByPopular, setSortByPopular, sortByPopular };
  }

  dispatch(setSortByPopularForRedux(false))
  return { sortedPosts: sortedByFresh, setSortByPopular, sortByPopular };
};

export default useSortPost