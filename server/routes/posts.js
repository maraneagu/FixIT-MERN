import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  getPost,
  deletePost,// Import the new controller function
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", verifyToken, getPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:postId", verifyToken, deletePost);

export default router;
