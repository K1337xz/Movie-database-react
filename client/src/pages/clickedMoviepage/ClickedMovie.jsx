import { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import axios from "axios";
import "./clickedmovie.scss";

export default function ClickedMovie() {
	const movieId = window.location.pathname.slice(3);
	const api_image = `https://image.tmdb.org/t/p/w500`;
	const api_url = "https://api.themoviedb.org/3/";
	const [clickedMovie, setClickedMovie] = useState([]);
	const [clickedCredits, setClickedCredits] = useState([]);
	const [directors, setDirectors] = useState([]);
	const myStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `linear-gradient(0deg, rgba(233, 246, 251, 0.3), rgba(39, 161, 218, 0.9)), url(${api_image}/${clickedMovie.backdrop_path}) `,
		width: "100%",
		height: "75%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const data = await axios.get(`${api_url}/movie/${movieId}`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				const creditsData = await axios.get(
					`${api_url}/movie/${movieId}/credits`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				setClickedMovie(data.data);
				setClickedCredits(creditsData.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovie();
	}, []);

	return (
		<>
			<Nav />
			<main className="container">
				<div className="clickedMovie">
					<div className="clickedMovie__top" style={myStyle}>
						<div className="clickedMovie__topContent">
							<div className="clickedMovie__posterImage">
								<img
									src={`${api_image}${clickedMovie.poster_path}`}
									alt={`${clickedMovie.title} poster image`}
									className="clickedMovie__posterImage--image"
								/>
							</div>
							<div className="clickedMovie__rightMovieContent">
								<ul className="clickedMovie__rightMovieContent--menu">
									{clickedMovie.genres
										? clickedMovie.genres.map((itm) => (
												<li key={itm.id}>
													{itm.name},
												</li>
										  ))
										: "No genres"}
								</ul>
								<h1>{clickedMovie.title}</h1>
								<p>{clickedMovie.overview}</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
