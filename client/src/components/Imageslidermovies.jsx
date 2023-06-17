import { useEffect, useState } from "react";

import axios from "axios";
import Sceletonimage from "./Sceleton_image/Sceletonimage";

export default function Imageslider(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [upcomingMovies, setUpcomingMovies] = useState();
	const [tvSeries, setTvseries] = useState();
	const api_image = `https://image.tmdb.org/t/p/original`;
	const api_url = "https://api.themoviedb.org/3/";

	useEffect(() => {
		const fetchUpcomingMovie = async () => {
			setIsLoading(true);
			try {
				const dataM = await axios.get(`${api_url}/movie/upcoming`, {
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
			setTimeout(() => {
				setIsLoading(false);
			}, 827);
		};
		fetchUpcomingMovie();
	}, []);

	if (isLoading) {
		return <Sceletonimage />;
	}
	console.log(tvSeries);
	return (
		<>
			{props.check ? (
				<>
					<img
						src={`${api_image}${
							tvSeries[props.slider].backdrop_path
						}`}
						className="mainContent__imageBackground"
						alt="background movie image"
					/>
					<img
						src={`${api_image}${
							tvSeries[props.slider].backdrop_path
						}`}
						className="mainContent__imageMain"
						alt="background movie image"
					/>
				</>
			) : (
				<>
					<img
						src={`${api_image}${
							upcomingMovies[props.slider].backdrop_path
						}`}
						className="mainContent__imageBackground"
						alt="background movie image"
					/>
					<img
						src={`${api_image}${
							upcomingMovies[props.slider].backdrop_path
						}`}
						className="mainContent__imageMain"
						alt="background movie image"
					/>
				</>
			)}
		</>
	);
}
