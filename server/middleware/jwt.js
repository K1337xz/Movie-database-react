export const verifyToken = (req, res) => {
	const token = req.cookies.accesToken;
	if (!token) {
		return res.status(401).send("You are not authenticated!");
	}
	jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
		if (err) {
			return res.status(401).send("Token is not Valid! ");
		}
		req.userId = payload.id;
	});
};
