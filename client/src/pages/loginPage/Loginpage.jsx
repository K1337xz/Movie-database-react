import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./loginpage.scss";

export default function Loginpage() {
	return (
		<>
			<Nav />
			<main className="container">
				<div className="signUp">
					<div className="signUp__top">
						<h1>Create Account</h1>
					</div>
					<div className="signUp__formWrapper">
						<form className="signUp__form">
							<label htmlFor="username">
								<input
									type="text"
									id="username"
									placeholder="Username"
								/>
							</label>
							<label htmlFor="password">
								<input
									type="password"
									id="password"
									placeholder="Password"
								/>
							</label>
							<label htmlFor="comfirmPassword">
								<input
									type="password"
									id="comfirmPassword"
									placeholder="Confirm Password"
								/>
							</label>
							<button className="signUp__form--button">
								Create Account
							</button>
						</form>

						<p>
							Already have an account?{" "}
							<Link to="/login">Log In</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
