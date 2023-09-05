const signupValidation = (value) => {
	let errors = {};

	if (!value.username) {
		errors.username = "Username is required!";
	} else if (value.username.length < 3) {
		errors.username = "Username must be more than 3 characters";
	}
	if (!value.password) {
		errors.password = "Password is required!";
	} else if (value.password.length < 6) {
		errors.password = "Password must be more than 6 characters";
	}
	if (value.confirmPassword != value.password) {
		errors.passwordConfirm = "Passwords must be same";
	}

	return errors;
};

export default signupValidation;
