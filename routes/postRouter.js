import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../index.js";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";

const postRouter = express.Router();

postRouter.get("/", verifyToken, getFeedPosts);
postRouter.get("/:userId/posts", verifyToken, getUserPosts);
postRouter.patch("/:id/like", verifyToken, likePosts);

export default postRouter;
