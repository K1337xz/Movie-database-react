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

export default function ClickedUser() {
	const username = window.location.pathname.slice(3);
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState({});
	const [active, setActive] = useState("About Me");
	console.log(username);
	const navigateItems = [
		{
			name: "About Me",
		},
	];
	useEffect(() => {
		const userData = async () => {
			try {
				const data = await myApi.get(`/users/u/${username}`);
				setProfile(data.data);
			} catch (error) {}
		};
		userData();
	}, []);

	return (
		<>
			<Nav />
			<main className="container">
				<div className="profile">
					<div className="profile__topContent">
						<div className="profile__avatarSection">
							<div className="profile__avatarSection-image">
								<img
									src={profile.img || noavatar}
									alt="User avatar"
									className="profile__avatarSection"
								/>
							</div>
							<p>{profile.username}</p>
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
						<div className="profile__aboutMe-content">
							{profile.desc}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
