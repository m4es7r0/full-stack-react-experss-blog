import React from "react";

import { useGetComentQuery } from "../../redux/api/api";
import { useSelector } from "react-redux";

import { SideBlock } from "../SideBlock";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import styles from "./CommentsBlock.module.scss";

export const CommentsBlock = ({ children, items, isEditable }) => {
  const { data, error, isLoading, isError } = useGetComentQuery();
  const userData = useSelector(({ auth }) => auth.user);

  return (
    <SideBlock title="Комментарии">
      {isError && !data && (
        <ListItem>
          <ListItemText primary={error.error} />
        </ListItem>
      )}
      <List>
        {(isLoading ? [...Array(5)] : items)?.map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem className={styles.comment} alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
                  <div className={styles.btn}>
                    <IconButton disabled={obj.user._id !== userData?._id} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton disabled={obj.user._id !== userData?._id} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
