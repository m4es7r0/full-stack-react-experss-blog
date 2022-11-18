import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortByPopular as setSortByPopularForRedux } from "../redux/slices/posts";

const useSortPost = (posts = [], tagName) => {
  const dispatch = useDispatch();
  const isSortByPopular = useSelector(({ posts }) => posts.sortByPopular);
  const [sortByPopular, setSortByPopular] = React.useState(isSortByPopular);

  React.useEffect(() => {
    if (sortByPopular) dispatch(setSortByPopularForRedux(true));
    else dispatch(setSortByPopularForRedux(false));
  }, [sortByPopular, dispatch]);

  const sortedByTagName = posts.slice().filter((e) => e.tags.includes(tagName));

  const sortedByFresh = (items) => {
    return items
      .slice()
      .sort((a, b) =>
        Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1
      );
  };

  const sortedByPopular = (items) => {
    return items.slice().sort((a, b) => (a.viewsCount < b.viewsCount ? 1 : -1));
  };

  if (sortByPopular) {
    return {
      sortedPosts: sortedByPopular(tagName ? sortedByTagName : posts),
      setSortByPopular,
      sortByPopular,
    };
  } else {
    return {
      sortedPosts: sortedByFresh(tagName ? sortedByTagName : posts),
      setSortByPopular,
      sortByPopular,
    };
  }
};

export default useSortPost;
