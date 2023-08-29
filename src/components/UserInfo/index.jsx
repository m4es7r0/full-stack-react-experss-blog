import { Avatar } from "@mui/material";
import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Avatar
        alt={fullName}
        src={avatarUrl}
        sx={{
          marginRight: "10px",
          width: "30px",
          height: "30px",
          textAlign: "center",
          fontSize: "1rem",
        }}
      />

      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
