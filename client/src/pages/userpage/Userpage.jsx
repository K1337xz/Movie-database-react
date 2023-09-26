import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import noavatar from "../../assets/pngwing.com.png";
import "./Userpage.scss";

export default function Userpage() {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	return (
		<>
			<Nav />
			<main className="container">
				<div className="profile">
					<div className="profile__topContent">
						<div className="profile__avatarSection">
							<img src={currentUser.img || noavatar} />
							<p>{currentUser.username}</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
