import { useEffect, useState } from "react";
import axios from "axios";
import { Link, generatePath, useOutlet } from "react-router-dom";
import Sceleton from "./Sceleton/Sceleton";

export default function RightMovieInfo(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [upcomingMovies, setUpcomingMovies] = useState({});
	const [genreData, setGenereData] = useState([]);
	const [genereConverted, setGenereConverted] = useState();
	const api_image = `https://image.tmdb.org/t/p/original`;
	const api_url = "https://api.themoviedb.org/3/";
	useEffect(() => {
		const fetchUpcomingMovie = async () => {
			setIsLoading(true);
			try {
				const genreData = await axios.get(
					`http://api.themoviedb.org/3/genre/movie/list?api_key=${
						import.meta.env.VITE_API_KEY
					}`
				);
				const data = await axios.get(`${api_url}/movie/upcoming/`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				setUpcomingMovies(data.data.results);
			} catch (error) {
				console.log(error);
			}
			/* 	setGenere(genreData.data.results); */
			setIsLoading(false);
			console.log(upcomingMovies);
		};
		fetchUpcomingMovie();
	}, []);

	console.log(upcomingMovies.title);
	if (isLoading) {
		return <Sceleton />;
	}
	return (
		<>
			<span className="genere"></span>
			<h1 className="title">{upcomingMovies[props.slider].title}</h1>
			<p className="overview">
				{upcomingMovies[props.slider].overview.substring(
					0,
					upcomingMovies[props.slider].overview.length / 2
				) + " ..."}
			</p>
			<Link className="mainContent__loadMoreBtn">Read more</Link>
		</>
	);
}
