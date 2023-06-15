import { useEffect, useState } from "react";
import axios from "axios";

export default function Imageslider(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [upcomingMovies, setUpcomingMovies] = useState();
	const api_image = `https://image.tmdb.org/t/p/original`;
	const api_url = "https://api.themoviedb.org/3/";
	const fetchUpcomingMovie = async () => {
		const data = await axios.get(`${api_url}/movie/upcoming/`, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});
		setUpcomingMovies(data.data.results);
	};
	useEffect(() => {
		fetchUpcomingMovie();
	}, []);

	return (
		<>
			<img
				src={
					upcomingMovies
						? `${api_image}${
								upcomingMovies[props.slider].backdrop_path
						  }`
						: null
				}
				className="mainContent__imageBackground"
				alt="background movie image"
			/>
			<img
				src={
					upcomingMovies
						? `${api_image}${
								upcomingMovies[props.slider].backdrop_path
						  }`
						: null
				}
				className="mainContent__imageMain"
				alt="background movie image"
			/>
		</>
	);
}
