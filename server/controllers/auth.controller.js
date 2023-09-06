import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	try {
		const hashPassword = bcrypt.hashSync(req.body.password, 5);

		const newUser = new User({
			...req.body,
			password: hashPassword,
		});
		await newUser.save();
		res.status(201).send("User has been created");
	} catch (error) {
		res.status(500).send("SOMTETHING WENT WRONG");
	}
};

export const login = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(404).send("User not found!");
		}

		const isCorrect = bcrypt.compareSync(req.body.password, user.password);
		if (!isCorrect) {
			return res.status(400).send("Wrong password or username!");
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_KEY
		);

		const { password, ...info } = user._doc;
		res.cookie("accesToken", token, { httpOnly: true })
			.status(200)
			.send(info);
	} catch (error) {
		res.status(500).send("SOMTETHING WENT WRONG");
	}
};

export const logout = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).send("SOMTETHING WENT WRONG");
	}
};
