import error from "../utils/error";
import Review from "../models/reviews.model.js";

export const createReview = async (req, res, next) => {
	const newReview = new Review({
		userId: req.userId,
		postId: req.body.postId,
		desc: req.body.desc,
		stars: req.body.stars,
	});
	try {
		const saveReview = await newReview.save();
	} catch (error) {
		next(error);
	}
};

export const getReview = async (req, res, next) => {
	try {
		const reviews = await Review.find({ postId: req.params.id });
		res.status();
	} catch (error) {
		next(error);
	}
};

export const deleteReview = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};
