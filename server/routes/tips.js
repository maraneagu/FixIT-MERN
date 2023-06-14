import express from "express";
import { deleteTip, getFeedTips, getTip, getUserTips, likeTip } from "../controllers/tips.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedTips);
router.get("/:userId/tips", verifyToken, getUserTips);
router.get("/:tipId", verifyToken, getTip);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeTip);
router.delete("/:tipId",verifyToken, deleteTip);

export default router;