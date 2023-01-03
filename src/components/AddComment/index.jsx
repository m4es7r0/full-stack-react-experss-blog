import React from "react";
import { useSelector } from "react-redux";
import { useMakeComentMutation } from "../../redux/api/api";

import styles from "./AddComment.module.scss";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Index = ({ postId }) => {
  const isAuth = window.localStorage.getItem("token");
  const userData = useSelector(({ auth }) => auth.user);
  const [makeComent] = useMakeComentMutation();

  const [text, setText] = React.useState("");

  const [helperText, setHelperText] = React.useState(false)

  const onMakeComent = () => {
    if (text.length >= 5) {
      makeComent({
        user: userData?._id,
        postId,
        text,
      });
      setText("");
    } else {
      setHelperText(true)
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData?.avatarUrl || ""}
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              if (text.length >= 4) setHelperText(false)
            }}
            variant="outlined"
            maxRows={10}
            helperText={helperText ? "minimum comment length 5 characters" : "" }
            error={helperText}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={onMakeComent} disabled={!isAuth}>
            {isAuth ? "Send" : "Authorization required to send"}
          </Button>
        </div>
      </div>
    </>
  );
};
