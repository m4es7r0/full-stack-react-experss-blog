import React from "react";

import { useSelector } from "react-redux";
import {
  useGetComentQuery,
  useRemoveComentMutation,
  useUpdateComentMutation
} from "../../redux/api/api";

import Modal from "../../components/Modal";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import { SideBlock } from "../SideBlock";

import styles from "./CommentsBlock.module.scss";

export const CommentsBlock = ({ children, items, isEditable }) => {
  const userData = useSelector(({ auth }) => auth.user);

  const { data, error, isLoading, isError } = useGetComentQuery();
  const [update] = useUpdateComentMutation();
  const [remove] = useRemoveComentMutation();

  const [text, setText] = React.useState("");

  return (
    <SideBlock title="Comments">
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
                    <Modal
                      title="Editing a Comment"
                      component={
                        <>
                          <TextField
                            label="your comment"
                            multiline
                            fullWidth
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            style={{ alignSelf: "flex-start" }}
                            disabled={text.length < 5}
                            onClick={() => {
                              update({
                                id: obj._id,
                                patch: {
                                  text,
                                },
                              });
                            }}
                          >
                            {"Save"}
                          </Button>
                        </>
                      }
                    >
                      <span>
                        <IconButton
                          onClick={() => setText(obj.text)}
                          disabled={obj.user._id !== userData?._id}
                          color="primary"
                          size="small"
                          children={<EditIcon />}
                        ></IconButton>
                      </span>
                    </Modal>
                    <IconButton
                      onClick={() => {
                        if (window.confirm("Remove?")) remove(obj._id);
                      }}
                      disabled={obj.user._id !== userData?._id}
                      color="secondary"
                      size="small"
                      children={<DeleteIcon />}
                    />
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
