import { useState } from "react";
import Nav from "./components/Navbar/Nav";
import MainPage from "./pages/mainpage/Mainpage";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {
	return (
		<>
			<Nav />
			<main className="container">
				<MainPage />
			</main>
			<Footer />
		</>
	);
}

export default App;
