import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import noavatar from "../../assets/pngwing.com.png";
import "./Userpage.scss";

export default function Userpage() {
	const { currentUser } = useContext(AuthContext);
	return (
		<>
			<Nav />
			<main className="container">
				<div className="profile">
					<h1>WELCOME {currentUser.username}!!!!</h1>
				</div>
			</main>
			<Footer />
		</>
	);
}
