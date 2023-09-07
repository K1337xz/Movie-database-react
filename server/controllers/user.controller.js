import User from "../models/user.model.js";
import error from "../utils/error.js";

export const deleteUser = async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (req.userId !== user._id.toString()) {
		next(error(403, "You can only delete your account!!"));
	}
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send("deleted");
};
