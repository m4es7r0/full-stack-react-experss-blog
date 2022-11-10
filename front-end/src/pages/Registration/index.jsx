import React from "react";

import { useNavigate } from "react-router-dom";
import { useLazyAuthMeQuery, useRegisterMutation } from "../../redux/api/api";
import { useForm } from "react-hook-form";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";

export const Registration = () => {
  const [reg, { error, isLoading }] = useRegisterMutation();
  const [isAuth] = useLazyAuthMeQuery();
  const navigate = useNavigate();

  const msgFromServ = (arr, param) => {
    const _in = arr?.filter((e) => e?.param === param);
    return _in[0]?.msg;
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
      avatarUrl: "http://localhost:4000/uploads/zero2.jpg",
    },
    mode: "all",
  });

  const onSubmit = (values) => {
    reg(values)
      .then(({ data }) => {
        if ("token" in data) {
          window.localStorage.setItem("token", data.token);
        }
      })
      .then(() => isAuth())
      .then(() => navigate('/'));
  };

  if (isLoading)
    return (
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Processing...
        </Typography>
      </Paper>
    );

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          {...register("fullName", { required: "this is required field" })}
          label="Полное имя"
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
          label="Пароль"
          error={errors?.password || error?.status === 400}
          helperText={
            error?.status === 400
              ? msgFromServ(error?.data, "password")
              : "" || errors.password?.message
          }
          fullWidth
        />
        <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
