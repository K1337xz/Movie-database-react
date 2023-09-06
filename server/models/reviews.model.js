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
		stars: {
			type: Number,
			required: true,
			enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		},
		desc: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
