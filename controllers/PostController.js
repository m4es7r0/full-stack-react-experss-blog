import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      user: req.userId,
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
    });

    const post = await doc.save();
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "failed to create post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const _posts = await PostModel.find().populate("user").exec();

    // hide passwordHash in res
    const posts = _posts.map(({ _doc }) => {
      const { user, ...data } = _doc;

      const { _doc: userDoc } = user;
      const { passwordHash, createdAt, updatedAt, __v, ...userData } = userDoc;

      return { ...data, user: userData };
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "failed to get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.postId;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        doc.user = {
          _id: doc.user._id,
          fullName: doc.user.fullName,
          avatarUrl: doc.user.avatarUrl,
          email: doc.user.email,
        };

        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "could not fetch post",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "post not found",
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something was wrong",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.postId;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "could not fetch post",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "post not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something was wrong",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.postId;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        user: req.userId,
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
      },
      (err, doc) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "could not fetch",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "post not found",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something was wrong",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((e) => e.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something was wrong",
    });
  }
};
