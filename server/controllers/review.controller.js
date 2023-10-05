import error from "../utils/error.js";
import Review from "../models/reviews.model.js";
import User from "../models/user.model.js";

export const createReview = async (req, res, next) => {
	const user = await User.findById(req.userId);
	const newReview = new Review({
		userId: req.userId,
		username: req.body.username,
		img: req.body.img,
		postId: req.body.postId,
		desc: req.body.desc,
		stars: req.body.stars,
	});
	try {
		const review = await Review.findOne({
			postId: req.body.postId,
			userId: req.userId,
		});
		if (review) {
			return next(
				error(403, "You already crated a review for this movie!")
			);
		}

		const saveReview = await newReview.save();
		const updateUser = await user.updateOne({
			$push: { reviews: req.body.postId },
		});

		res.status(201).send(saveReview);
	} catch (error) {
		next(error);
	}
};

export const getReview = async (req, res, next) => {
	try {
		const reviews = await Review.find({ postId: req.params.id });
		res.status(200).send(reviews);
	} catch (error) {
		next(error);
	}
};

export const updateImage = async (req, res, next) => {
	try {
		const reviews = await Review.find({ username: req.params.username });
		res.status(200).send(reviews);
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
