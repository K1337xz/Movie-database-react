import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.DB);
	} catch (error) {
		console.log(error);
	}
};
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

app.listen(4000, () => {
	connect();
	console.log("backend server run");
});
