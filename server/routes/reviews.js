import express from "express";
import {
  createReview, deleteReview, getPostReviews,
} from "../controllers/reviews.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/:userId/:postId/create", verifyToken, createReview);
router.get("/:postId/postReviews", verifyToken, getPostReviews);

/* DELETE */
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
