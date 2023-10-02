import express from "express";
import {
	deleteUser,
	getUser,
	getUserByNickname,
	updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
router.delete("/:id", verifyToken, deleteUser);
router.get("/id/:id", getUser);
router.get("/u/:username", getUserByNickname);
router.put("/e/:username", updateUser);

export default router;
