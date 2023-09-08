import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: false,
			default: "",
		},
		desc: {
			type: String,
			default: "",
			required: false,
		},
		reviews: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);
export default mongoose.model("User", userSchema);
