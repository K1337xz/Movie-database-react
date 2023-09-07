import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
	createReview,
	getReviews,
	deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, crateReview);
router.get("/:id", getReviews);
router.delete("/:id", deleteReview);
