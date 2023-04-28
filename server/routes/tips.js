import express from "express";
import { getFeedTips, getUserTips, likeTip } from "../controllers/tips.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedTips);
router.get("/:userId/tips", verifyToken, getUserTips);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeTip);

export default router;