import React from "react";
import { useGetTagsQuery } from "../redux/api/api";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { useSelector } from "react-redux";

export const TagsBlock = () => {
  const { data: items = [], error, isLoading, isError } = useGetTagsQuery();

  const tags = useSelector(({ posts }) => posts.tags);

  return (
    <SideBlock title="Тэги">
      {isError && !items.length > 0 && (
        <ListItem>
          <ListItemText primary={error.error} />
        </ListItem>
      )}
      <List>
        {(isLoading ? [...Array(5)] : tags.slice(0, 10))?.map((name, i) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
            key={i}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
