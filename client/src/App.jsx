import { useState } from "react";
import Nav from "./components/Navbar/Nav";
import Mainpage from "./pages/mainpage/Mainpage";
import "./App.scss";

function App() {
	return (
		<>
			<Nav />
			<main className="container">
				<Mainpage />
			</main>
		</>
	);
}

export default App;
