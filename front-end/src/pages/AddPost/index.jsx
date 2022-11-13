import React from "react";
import { useAuthRedirect } from "../../hooks/authFaildRedirect";

import { useNavigate } from "react-router-dom";

import {
  useUploadFileMutation,
  useMakePostMutation,
} from "../../redux/api/api";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  useAuthRedirect();
  const navigate = useNavigate()

  const [uploadFile] = useUploadFileMutation();
  const [makePost] = useMakePostMutation();

  const inputImageRef = React.useRef(null);
  const [fields, setFields] = React.useState({
    image: "",
    value: "",
    title: "",
    tags: "",
  });

  const handleChangeFile = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    uploadFile(formData)
      .unwrap()
      .then((data) => setFields((prev) => ({ ...prev, image: data })));
  };

  const onClickRemoveImage = () => {
    setFields((prev) => ({ ...prev, image: "" }));
  };

  const onChange = React.useCallback((value) => {
    setFields((prev) => ({ ...prev, value }));
  }, []);

  const onSubmit = () => {
    makePost({
      title: fields.title,
      text: fields.value,
      tags : !fields.tags ? [] : fields.tags.trim().split(', '),
      imageUrl: `http://localhost:4000${fields.image.url}`
    })
    navigate('/')
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "auto",
      autofocus: true,
      placeholder: "Введите текст...",
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
            onClick={() => inputImageRef.current.click()}
            variant="outlined"
            size="large"
          >
            Загрузить превью
          </Button>
          <input
            ref={inputImageRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          {fields.image && (
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={onClickRemoveImage}
            >
              Удалить
            </Button>
          )}
        </div>
        {fields.image && (
          <img
            className={styles.image}
            src={`http://localhost:4000${fields.image.url}`}
            alt="Uploaded"
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
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={fields.tags}
        onChange={(e) =>
          setFields((prev) => ({ ...prev, tags: e.target.value }))
        }
        variant="standard"
        placeholder="Тэги"
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
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large" color="error" variant="contained">
            Отмена
          </Button>
        </a>
      </div>
    </Paper>
  );
};
