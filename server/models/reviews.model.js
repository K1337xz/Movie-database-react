import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
	{
		postId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		stars: {
			type: Number,
			required: false,
			enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		},
		desc: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
