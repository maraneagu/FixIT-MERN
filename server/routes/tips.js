import express from "express";
import { deleteTip, getFeedTips, getTip, getUserTips, likeTip } from "../controllers/tips.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedTips);
router.get("/:userId/tips", verifyToken, getUserTips);
router.get("/:postId", verifyToken, getTip);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeTip);
// router.delete("/:tipId",verifyToken, deleteTip);
//router.post("/:userId/create", verifyToken, createPost);
router.delete("/:postId",verifyToken, deleteTip);

export default router;