import React from "react";

import { Navigate } from "react-router-dom";

import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { useLoginUserMutation } from "../../redux/api/api";

import { useForm } from "react-hook-form";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const [login, { isLoading, error }] = useLoginUserMutation();
  const onSubmit = (values) => {
    login(values).then(({data}) => {
      if ("token" in data) {
        window.localStorage.setItem("token", data.token);
      }
    });
  };

  if (isLoading)
    return (
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Processing...
        </Typography>
      </Paper>
    );

  if (isAuth)
    return (
      <Navigate to="/" />
      // <Paper classes={{ root: styles.root }}>
      //   <Typography classes={{ root: styles.title }} variant="h5">
      //     Alredy Logged
      //   </Typography>
      // </Paper>
    );

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          {...register("email", { required: "this is required field" })}
          label="E-Mail"
          type="email"
          error={errors?.email || error?.status === 400}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register("password", { required: "this is required field" })}
          label="Пароль"
          type={"password"}
          error={errors?.password || error?.status === 400}
          helperText={
            error?.status === 400
              ? "invalide password or login"
              : "" || errors.password?.message
          }
          fullWidth
        />
        <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
