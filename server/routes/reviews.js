import express from "express";
import {

  createReview, deleteReview, getPostReviews,
  // Import the new controller function
} from "../controllers/reviews.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* create */
router.post("/:userId/:postId/create", verifyToken, createReview);
router.get("/:postId/postReviews", verifyToken, getPostReviews);

// delete
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
