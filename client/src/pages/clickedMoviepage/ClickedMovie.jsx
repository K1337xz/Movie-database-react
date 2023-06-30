import { useEffect, useState } from "react";
import Castslider from "../../components/castSlider/Castslider";
import { Toggle } from "../../components/Toggle/Togglebtn";
import Nav from "../../components/Navbar/Nav";
import axios from "axios";
import "./clickedmovie.scss";

export default function ClickedMovie() {
	const movieId = window.location.pathname.slice(3);
	const api_image = `https://image.tmdb.org/t/p/w500`;
	const api_url = "https://api.themoviedb.org/3/";
	const [clickedMovie, setClickedMovie] = useState([]);
	const [cast, setCast] = useState([]);
	const [fullCast, setFullCast] = useState([]);
	const [directors, setDirectors] = useState([]);
	const directName = directors[0] ? directors[0].name : "";
	const [checked, setChecked] = useState(false);
	const myStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `linear-gradient(0deg, rgba(233, 246, 251, 0.3), rgba(39, 161, 218, 0.9)), url(${api_image}/${clickedMovie.backdrop_path}) `,
		width: "100%",
		height: "100%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};
	const logState = (state) => {
		setChecked((state) => !state);
		console.log(state);
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
				setCast(creditsData.data.cast.slice(0, 10));
				setDirectors(
					creditsData.data.crew.filter(
						(item) => item.job === "Director"
					)
				);
				document.title = `${data.data.title}`;
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovie();
	}, []);

	const cardCast = cast.map((dataCast) => {
		return <Castslider key={dataCast.id} dataCast={dataCast} />;
	});

	console.log(cast);
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
								<p className="clickedMovie__rightMovieContent--overview">
									{clickedMovie.overview}
								</p>
								<div className="clickedMovie__rightMovieContent--director">
									<p>Director</p>
									<p>{directName}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="castSlider">
					<div className="castSlider__sliderTopContent">
						<h2>CAST</h2>
						<div className="castSlider__toggleBtn">
							<Toggle label="Toggle me" onClick={logState} />
							<p>TV Series</p>
						</div>
					</div>
					<div className="castSlider__slider">
						<ul className="castSlider__menu">{cardCast}</ul>
					</div>
				</div>
			</main>
		</>
	);
}
