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
	const [active, setActive] = useState(null);
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

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
				</div>
			</main>
			<Footer />
		</>
	);
}
