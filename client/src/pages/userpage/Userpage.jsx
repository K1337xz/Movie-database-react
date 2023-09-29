import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import noavatar from "../../assets/pngwing.com.png";
import "./Userpage.scss";

export default function Userpage() {
	const navigateItems = [
		{
			name: "About Me",
		},
		{
			name: "Reviews",
		},
		{
			name: "Settings",
		},
	];
	const [active, setActive] = useState("About Me");
	const [descriptionInputValue, setDescriptionInputValue] = useState({});
	const [description, setDescription] = useState(false);
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	const toggleAddDescription = () => {
		setDescription(true);
	};
	const handleChange = (e) => {
		setDescriptionInputValue({
			[e.target.name]: e.target.value,
		});
	};
	return (
		<>
			<Nav />
			<main className="container">
				<div className="profile">
					<div className="profile__topContent">
						<div className="profile__avatarSection">
							<img
								src={currentUser.img || noavatar}
								alt="User avatar"
							/>
							<p>{currentUser.username}</p>
						</div>
						<div className="profile__navWrapper">
							<ul className="profile__nav">
								{navigateItems.map((item) => {
									return (
										<li
											key={item.name}
											onClick={() => {
												setActive(item.name);
											}}
											className={
												active === item.name
													? "profile__navItem active"
													: "profile__navItem"
											}
										>
											{item.name}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className="profile__content">
						{active === "About Me" && (
							<div className="profile__aboutMe">
								{currentUser.desc ? (
									currentUser.desc
								) : description ? (
									<form className="profile__form">
										<label htmlFor="description">
											<input
												id="description"
												name="description"
												type="text"
												className="profile__form--input"
												onChange={handleChange}
											/>
										</label>
										<div className="profile__form-buttons">
											<button className="profile__form--cancelBtn">
												Cancel
											</button>
											<button className="profile__form--submitBtn">
												Add Description
											</button>
										</div>
									</form>
								) : (
									<p
										className="profile__aboutMe--addDescription"
										onClick={toggleAddDescription}
									>
										Click to add your description
									</p>
								)}
							</div>
						)}
						{active === "Reviews" && (
							<div>
								<h2>Reviews</h2>
							</div>
						)}
						{active === "Settings" && (
							<div>
								<h2>Settings</h2>
							</div>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
