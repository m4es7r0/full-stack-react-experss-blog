import mongoose from "mongoose";

const ComentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
      unique: false,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coment", ComentSchema);
