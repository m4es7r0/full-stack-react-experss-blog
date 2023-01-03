import React from "react";

import { useAuthRedirect } from "../../hooks/authFaildRedirect";
import useGetSelectedPosts from "../../hooks/getSelectedPosts";

import { Link, useNavigate } from "react-router-dom";

import {
  useMakePostMutation,
  useRemoveFileMutation,
  useUpdatePostMutation, useUploadFileMutation
} from "../../redux/api/api";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [uploadFile] = useUploadFileMutation();
  const [removeFile] = useRemoveFileMutation();
  const [updatePost] = useUpdatePostMutation();
  const [makePost] = useMakePostMutation();

  const [fields, setFields] = React.useState({
    image: "",
    imageByUrl: "",
    value: "",
    title: "",
    tags: "",
  });
  const inputImageRef = React.useRef(null);
  const { postId } = useGetSelectedPosts(setFields);

  const handleChangeFile = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    uploadFile(formData)
      .unwrap()
      .then((data) => setFields((prev) => ({ ...prev, image: data })));
  };

  const onClickRemoveImage = () => {
    removeFile({ name: `${fields.image}` });
    setFields((prev) => ({ ...prev, image: "" }));
  };

  const onChange = React.useCallback((value) => {
    setFields((prev) => ({ ...prev, value }));
  }, []);

  const onSubmit = () => {
    if (postId) {
      updatePost({
        id: postId,
        patch: {
          title: fields.title,
          text: fields.value,
          tags: !fields.tags ? [] : fields.tags.trim().split(", "),
          imageUrl: fields.image
            ? `https://tiny-blog-back-end-server.vercel.app/${fields.image}`
            : fields.imageByUrl,
        },
      })
        .unwrap()
        .then(() => navigate(`/posts/${postId}`));
    } else {
      makePost({
        title: fields.title,
        text: fields.value,
        tags: !fields.tags ? [] : fields.tags.trim().split(", "),
        imageUrl: fields.image
          ? `https://tiny-blog-back-end-server.vercel.app/${fields.image}`
          : fields.imageByUrl,
      })
        .unwrap()
        .then((data) => navigate(`/posts/${data._id}`));
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "auto",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <div className={styles.head}>
        <div>
          <Button
            onClick={() => {
              inputImageRef.current.click();
              setFields((prev) => ({ ...prev, imageByUrl: "" }));
            }}
            variant="outlined"
            size="large"
          >
            Upload preview
          </Button>
          <input
            ref={inputImageRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          <TextField
            placeholder="image url"
            value={fields.imageByUrl}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, imageByUrl: e.target.value }));
              if (fields.image) onClickRemoveImage();
            }}
          />
          {fields.image && (
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={onClickRemoveImage}
            >
              Remove
            </Button>
          )}
        </div>
        {(fields.image || fields.imageByUrl) && (
          <img
            className={styles.image}
            src={
              fields.image
                ? `https://tiny-blog-back-end-server.vercel.app/${fields.image}`
                : fields.imageByUrl
            }
            alt="wrong url"
          />
        )}
      </div>
      <TextField
        classes={{ root: styles.title }}
        value={fields.title}
        onChange={(e) =>
          setFields((prev) => ({ ...prev, title: e.target.value }))
        }
        variant="standard"
        placeholder="Article title..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={fields.tags}
        onChange={(e) =>
          setFields((prev) => ({ ...prev, tags: e.target.value }))
        }
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={fields.value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {postId ? "Save" : "Publish"}
        </Button>
        <Link to="/">
          <Button size="large" color="error" variant="contained">
            Cancel
          </Button>
        </Link>
      </div>
    </Paper>
  );
};
