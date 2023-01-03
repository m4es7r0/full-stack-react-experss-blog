import React from "react";

import { useLazyAuthMeQuery, useRegisterMutation } from "../../redux/api/api";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "../../components/Modal";

import styles from "./Login.module.scss";

export const Registration = () => {
  const navigate = useNavigate();

  const [reg, { error, isLoading }] = useRegisterMutation();
  const [isAuth] = useLazyAuthMeQuery();
  
  const [imageUrl, setUrl] = React.useState("");

  const onSubmit = (values) => {
    const reqData = {
      ...values,
      avatarUrl: imageUrl,
    };
    reg(reqData)
      .then(({ data }) => {
        if ("token" in data) {
          window.localStorage.setItem("token", data.token);
        }
      })
      .then(() => isAuth())
      .then(() => navigate("/"));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatarUrl: "",
    },
    mode: "all",
  });

  const msgFromServ = (arr, param) => {
    const _in = arr?.filter((e) => e?.param === param);
    return _in[0]?.msg;
  };

  if (isLoading) {
    return (
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Processing...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Register
      </Typography>
      <div className={styles.avatar}>
        <Modal
          title="Image URL"
          component={
            <TextField
              label="image url"
              type="text"
              value={imageUrl}
              onChange={(e) => setUrl(e.target.value)}
            />
          }
        >
          <Avatar sx={{ width: 100, height: 100 }} src={imageUrl} />
        </Modal>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          {...register("fullName", { required: "this is required field" })}
          label="Full name"
          type="text"
          error={errors?.fullName || error?.data}
          helperText={
            error?.status === 400
              ? msgFromServ(error?.data, "fullName")
              : "" || errors.fullName?.message
          }
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register("email", { required: "this is required field" })}
          type="email"
          label="E-Mail"
          error={errors?.email || error?.status === 400}
          helperText={
            error?.status === 400
              ? msgFromServ(error?.data, "email")
              : "" || errors.email?.message
          }
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register("password", { required: "this is required field" })}
          type="password"
          label="Password"
          error={errors?.password || error?.status === 400}
          helperText={
            error?.status === 400
              ? msgFromServ(error?.data, "password")
              : "" || errors.password?.message
          }
          fullWidth
        />
        <Button
          type="submit"
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
        >
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
