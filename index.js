import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import corse from "cors";
import fs from "fs";
import dotenv from "dotenv";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  postUpdateValidation,
} from "./validations/validations.js";

import watchTheFolder from "./utils/watchTheFolder.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import * as ComentController from "./controllers/ComentController.js";

dotenv.config();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.error("DB error", err);
  });

const app = express();

app.use(express.json());
app.use(corse());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//clean folder when folder-size more then 99Mb
// watchTheFolder("uploads", 99);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.post("/upload-remove", checkAuth, (req, res) => {
  try {
    fs.unlink("uploads" + req.body.name, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      // file removed
    });
    res.json({
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
    });
  }
});

app.get("/posts/", PostController.getAll);
app.get("/posts/:postId", PostController.getOne);
app.get("/tags", PostController.getLastTags);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.patch(
  "/posts/:postId",
  checkAuth,
  postUpdateValidation,
  handleValidationErrors,
  PostController.update
);
app.delete("/posts/:postId", checkAuth, PostController.remove);

app.get("/coment", ComentController.getAll);
app.post("/coment", checkAuth, ComentController.create);
app.patch("/coment/:comentId", checkAuth, ComentController.update);
app.delete("/coment/:comentId", checkAuth, ComentController.remove);

app.listen(port, (err) => {
  if (err) return console.error(err);
  console.log("Server OK");
});
