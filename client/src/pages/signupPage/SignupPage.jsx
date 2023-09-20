import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import signupValidation from "../../hooks/scrollNav/signupValidation";
import "./signuppage.scss";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [err, setErr] = useState();

	const handleChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors(signupValidation(formValues));
		const { username, password } = formValues;
		try {
			await axios.post(
				"https://moviedb-api-gi64.onrender.com/api/v1/auth/signup",
				{
					username,
					password,
				}
			);
			navigate("/login");
		} catch (error) {
			console.log(error.response.data);
			setErr(error.response.data);
		}
	};
	return (
		<>
			<Nav />
			<main className="container">
				<div className="signUp">
					<div className="signUp__top">
						<h1>Create Account</h1>
					</div>
					<div className="signUp__formWrapper">
						<form className="signUp__form" onSubmit={handleSubmit}>
							<label htmlFor="username">
								<input
									type="text"
									id="username"
									name="username"
									placeholder="Username"
									onChange={handleChange}
									className={formErrors.username ? "err" : ""}
								/>
								<span className="signUp__form--error">
									{formErrors.username
										? formErrors.username
										: ""}
								</span>
							</label>
							<label htmlFor="password">
								<input
									type="password"
									id="password"
									name="password"
									placeholder="Password"
									onChange={handleChange}
									className={formErrors.password ? "err" : ""}
								/>
								<span className="signUp__form--error">
									{formErrors.password
										? formErrors.password
										: ""}
								</span>
							</label>
							<label htmlFor="comfirmPassword">
								<input
									type="password"
									id="comfirmPassword"
									name="confirmPassword"
									placeholder="Confirm Password"
									onChange={handleChange}
									className={
										formErrors.passwordConfirm ? "err" : ""
									}
								/>
								<span className="signUp__form--error">
									{formErrors.passwordConfirm
										? formErrors.passwordConfirm
										: ""}
								</span>
							</label>
							<button className="signUp__form--button">
								Create Account
							</button>
						</form>
						{err === "User already exists!" ? <p>{err}</p> : null}
						<p>
							Have an account?
							<Link to="/login"> Log in</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
