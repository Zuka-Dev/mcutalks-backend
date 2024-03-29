import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/:id", verifyToken, getUser);
userRouter.get("/:id/friends", verifyToken, getUserFriends);

userRouter.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default userRouter;
