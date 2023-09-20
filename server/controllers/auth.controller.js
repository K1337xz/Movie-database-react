import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import error from "../utils/error.js";

export const signup = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user) {
			return next(error(409, "User already exists!"));
		}

		const hashPassword = bcrypt.hashSync(req.body.password, 5);
		const newUser = new User({
			...req.body,
			password: hashPassword,
		});
		await newUser.save();
		res.status(201).send("User has been created");
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return next(error(404, "User not found!"));
		}

		const isCorrect = bcrypt.compareSync(req.body.password, user.password);
		if (!isCorrect) {
			return next(error(400, "Wrong password or username!"));
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_KEY
		);
		const { password, ...info } = user._doc;
		res.cookie("accesToken", token, {
			httpOnly: true,
			sameSite: "None",
			domain: "https://movie-database-react-five.vercel.app/",
		})
			.status(200)
			.send(info);
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		res.clearCookie("accesToken", {
			sameSite: "none",
			secure: true,
		})
			.status(200)
			.send("User has been logged out");
	} catch (error) {
		next(error);
	}
};
