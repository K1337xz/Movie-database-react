import { useState } from "react";
import Nav from "./components/Navbar/Nav";
import Mainpage from "./pages/mainpage/MainPage";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {
	return (
		<>
			<Nav />
			<main className="container">
				<Mainpage />
			</main>
			<Footer />
		</>
	);
}

export default App;
