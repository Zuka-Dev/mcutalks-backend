import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    course: {
      type: String,
      required: true,
      min: 5,
    },
    level: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

export default User;
