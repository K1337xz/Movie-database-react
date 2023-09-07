import jwt from "jsonwebtoken";
import error from "../utils/error.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.accesToken;
	if (!token) {
		return next(error(401, "You are not authenticated!"));
	}
	jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
		if (err) {
			return next(error(401, "Token is not Valid! "));
		}
		req.userId = payload.id;
		next();
	});
};
