import mongoose from "mongoose";

// - id: <String>
//     - userId: <String>
//     - caption: <String>
//     - likes: <Integer>
//     - comments: Array<String>
//     - picturePath: <String>

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
      },
    caption: {
      type: String,
      required: false,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    picturePath: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
