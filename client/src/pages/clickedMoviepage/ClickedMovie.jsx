import { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import axios from "axios";
import "./clickedmovie.scss";

export default function ClickedMovie() {
	const movieId = window.location.pathname.slice(3);
	const api_image = `https://image.tmdb.org/t/p/original`;
	const api_url = "https://api.themoviedb.org/3/";
	const [clickedMovie, setClickedMovie] = useState([]);
	const myStyle = {
		backgroundImage: `url(${api_image}/${clickedMovie.backdrop_path})`,
		width: "100%",
		height: "75%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		filter: "blur(9px)",
	};

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const data = await axios.get(`${api_url}/movie/${movieId}`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				setClickedMovie(data.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovie();
	}, []);
	console.log(clickedMovie);
	return (
		<>
			<Nav />
			<main className="container">
				<div className="clickedMovie">
					<div className="clickedMovie__top" style={myStyle}></div>
				</div>
				<p>{movieId}</p>
			</main>
		</>
	);
}
