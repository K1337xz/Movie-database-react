import Nav from "./components/Navbar/Nav";
import Mainpage from "./pages/mainpage/Mainpage";
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
