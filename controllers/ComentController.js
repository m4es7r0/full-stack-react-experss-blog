import ComentModel from "../models/Coment.js";
import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const _coments = await ComentModel.find().populate("user").exec();

    const coments = _coments.map(({ _doc }) => {
      const { user, ...data } = _doc;
      const { passwordHash, createdAt, updatedAt, __v, ...userData } = user._doc;

      return { ...data, user: userData };
    });

    res.json(coments);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something was wrong",
    });
  }
};

export const create = async (req, res) => {
  try {
    const _doc = new ComentModel({
      user: req.userId,
      text: req.body.text,
      postId: req.body.postId,
    });
    const coment = await _doc.save();

    const _postId = await req.body.postId;

    PostModel.findOneAndUpdate(
      {
        _id: _postId,
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

        const _coment = {...coment._doc, user: doc.user}

        res.json(_coment)
      }
    ).populate("user");
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "failed to create coment",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const comentId = req.params.comentId;

    ComentModel.findOneAndDelete(
      {
        _id: comentId,
      },
      (err, doc) => {
        PostModel.findOneAndUpdate(
          {
            _id: doc.postId,
          },
          {
            $inc: {
              comentsCount: -1,
            },
          },
          {
            returnDocument: "after",
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
                message: "source not found",
              });
            }
          }
        );

        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "could not fetch coment",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "coment not found",
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
    const comentId = await req.params.comentId;

    ComentModel.findOneAndUpdate(
      {
        _id: comentId,
      },
      {
        text: req.body.text,
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
