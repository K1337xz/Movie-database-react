import { useEffect, useState } from "react";
import axios from "axios";
import Sceletonimage from "./Sceleton_image/Sceletonimage";

export default function Imageslider(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [upcomingMovies, setUpcomingMovies] = useState();
	const api_image = `https://image.tmdb.org/t/p/original`;
	const api_url = "https://api.themoviedb.org/3/";

	useEffect(() => {
		const fetchUpcomingMovie = async () => {
			setIsLoading(true);
			try {
				const data = await axios.get(`${api_url}/movie/upcoming/`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				setUpcomingMovies(data.data.results);
			} catch (error) {
				console.log(error);
			}
			setTimeout(() => {
				setIsLoading(false);
			}, 827);

			console.log(upcomingMovies);
		};
		fetchUpcomingMovie();
	}, []);

	if (isLoading) {
		return <Sceletonimage />;
	}
	return (
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
	);
}
