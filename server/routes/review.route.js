import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
	createReview,
	getReview,
	deleteReview,
	updateImage,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:id", getReview);
router.delete("/:id", deleteReview);
router.put("/e/:username", updateImage);
export default router;
