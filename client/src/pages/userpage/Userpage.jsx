import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { myApi } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import noavatar from "../../assets/pngwing.com.png";
import ModalAddImage from "../../components/modalAddImage/ModalAddImage";
import "./Userpage.scss";

export default function Userpage() {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const { logout } = useContext(AuthContext);
	const navigateItems = [
		{
			name: "About Me",
		},
		{
			name: "Settings",
		},
	];
	const [active, setActive] = useState("About Me");
	const [descriptionInputValue, setDescriptionInputValue] = useState({});
	const [description, setDescription] = useState(false);
	const [modalAddImg, setModalAddImg] = useState(false);
	const [one, setOne] = useState();
	const [userValues, setUserValues] = useState({
		username: currentUser.username,
	});
	const [updateProfile, setUpdateProfile] = useState({
		username: false,
		password: false,
	});
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState({});
	const toggleAddDescription = () => {
		setDescription(true);
	};
	const handleChange = (e) => {
		setDescriptionInputValue({
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeUsername = (e) => {
		setUserValues({
			username: e.target.value,
		});
	};
	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			console.log(error.response);
		}
	};

	const toggleEditUsername = (e) => {
		setUpdateProfile((prev) => {
			return {
				...prev,
				username: true,
			};
		});
	};

	const cancelEditUsername = (e) => {
		e.preventDefault();
		setUpdateProfile((prev) => {
			return {
				...prev,
				username: false,
			};
		});
	};

	const toggleEditDescription = () => {
		setDescription(true);
	};

	const updateUsername = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await myApi.put(`/users/e/${currentUser.username}`, {
				username: userValues.username,
			});
			await myApi.put(`/reviews/e/${currentUser.username}`, {
				username: userValues.username,
			});
			profile.username = userValues.username;
		} catch (error) {
			console.log(error.response);
		} finally {
			localStorage.setItem("user", JSON.stringify(profile));
			setDescription(false);
			window.location.reload();
		}
	};

	const addAvatar = () => {
		setModalAddImg(true);
	};

	const changeDescription = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await myApi.put(`/users/e/${currentUser.username}`, {
				desc: descriptionInputValue.description,
			});
			profile.desc = descriptionInputValue.description;
		} catch (error) {
			console.log(error);
		} finally {
			localStorage.setItem("user", JSON.stringify(profile));
			setDescription(false);
			window.location.reload();
		}
	};

	useEffect(() => {
		const profile = JSON.parse(localStorage.getItem("user"));
		setProfile(profile);
	}, [loading]);

	return (
		<>
			<Nav />
			<main className="container">
				<div className="profile">
					<div className="profile__topContent">
						<div className="profile__avatarSection">
							<div className="profile__avatarSection-image">
								<img
									src={currentUser.img || noavatar}
									alt="User avatar"
									className="profile__avatarSection"
								/>
								<div
									className="profile__avatarSection-image--hover"
									onClick={addAvatar}
								>
									<p>Add Image!</p>
								</div>
							</div>
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
								{currentUser.desc && !description ? (
									<div className="profile__aboutMe-content">
										{currentUser.desc}
										<FontAwesomeIcon
											icon={faPenToSquare}
											className="profile__aboutMe--edit"
											onClick={toggleEditDescription}
										/>
									</div>
								) : currentUser.desc && description ? (
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
											<button
												className="profile__form--submitBtn"
												onClick={changeDescription}
											>
												Add Description
											</button>
										</div>
									</form>
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
											<button
												className="profile__form--submitBtn"
												onClick={changeDescription}
											>
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
						{active === "Settings" && (
							<div className="profile__settings">
								<div className="profile__values">
									{updateProfile.username ? (
										<form className="profile__valuesForm">
											<label htmlFor="editUsername">
												Username
												<input
													type="text"
													value={userValues.username}
													autoFocus
													onChange={
														handleChangeUsername
													}
												/>
											</label>
											<div className="profile__valuesForm-buttons">
												<button
													className="profile__valuesForm--cancelBtn"
													onClick={cancelEditUsername}
												>
													cancel
												</button>
												<button
													className="profile__valuesForm--updateBtn"
													onClick={updateUsername}
												>
													Update
												</button>
											</div>
										</form>
									) : (
										<div className="profile__values--username">
											<p className="">
												<span>Username</span>
												<br />
												{currentUser.username}
											</p>
											<FontAwesomeIcon
												icon={faPenToSquare}
												className="profile__values--edit"
												onClick={toggleEditUsername}
											/>
										</div>
									)}

									<div className="profile__lowerValues">
										<span
											className="profile__settings--logut"
											onClick={handleLogout}
										>
											Logout
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>
			<Footer />
			{modalAddImg && <ModalAddImage />}
		</>
	);
}
