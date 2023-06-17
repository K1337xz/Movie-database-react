import { useEffect, useState } from "react";
import axios from "axios";
import { Link, generatePath, useOutlet } from "react-router-dom";
import Sceleton from "./Sceleton_text/Sceleton";

export default function RightMovieInfo(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [upcomingMovies, setUpcomingMovies] = useState({});
	const [tvSeries, setTvseries] = useState({});
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
				const dataM = await axios.get(`${api_url}/movie/upcoming/`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				const dataS = await axios.get(`${api_url}/tv/top_rated`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				setTvseries(dataS.data.results);
				setUpcomingMovies(dataM.data.results);
			} catch (error) {
				console.log(error);
			}
			/* 	setGenere(genreData.data.results); */

			setIsLoading(false);
		};
		fetchUpcomingMovie();
	}, []);

	if (isLoading) {
		return <Sceleton />;
	}
	return (
		<>
			<span className="genere"></span>
			<h1 className="title">
				{props.check
					? tvSeries[props.slider].name
					: upcomingMovies[props.slider].title}
			</h1>
			<p className="overview">
				{props.check
					? tvSeries[props.slider].overview.substring(
							0,
							tvSeries[props.slider].overview.length / 2
					  ) + " ..."
					: upcomingMovies[props.slider].overview.substring(
							0,
							upcomingMovies[props.slider].overview.length / 2
					  ) + " ..."}
			</p>
			<Link
				className="mainContent__loadMoreBtn"
				to={
					props.check
						? `/s/${tvSeries[props.slider].id}`
						: `/m/${upcomingMovies[props.slider].id}`
				}
			>
				Read more
			</Link>
		</>
	);
}
