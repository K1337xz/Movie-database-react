import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import reviewRoute from "./routes/review.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
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
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});
app.use(
	cors({
		origin: "https://movie-database-react-five.vercel.app/",
		credential: true,
	})
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";

	return res.status(errorStatus).send(errorMessage);
});

app.listen(4000, () => {
	connect();
	console.log("backend server run");
});
