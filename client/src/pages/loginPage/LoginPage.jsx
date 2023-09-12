import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import signupValidation from "../../hooks/scrollNav/signupValidation";
import { AuthContext } from "../../context/authContext";
import "./loginPage.scss";
import { useContext, useState } from "react";
import axios from "axios";

export default function LoginPage() {
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [err, setErr] = useState();
	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors(signupValidation(formValues));
		try {
			await login(formValues);
			navigate("/");
		} catch (error) {
			console.log(error.response);
			setErr(error.response);
		}
	};
	return (
		<>
			<Nav />
			<main className="container">
				<div className="login">
					<div className="login__top">
						<h1>Login </h1>
					</div>
					<div className="login__formWrapper">
						<form className="login__form" onSubmit={handleSubmit}>
							<label htmlFor="username">
								<input
									type="text"
									id="username"
									name="username"
									placeholder="Username"
									onChange={handleChange}
									className={formErrors.username ? "err" : ""}
								/>
								<span className="login__form--error">
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
								<span className="login__form--error">
									{formErrors.password
										? formErrors.password
										: ""}
								</span>
							</label>
							<button className="login__form--button">
								Log In
							</button>
						</form>
						<p>
							Don't have an account?
							<Link to="/signup">Sign up</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
