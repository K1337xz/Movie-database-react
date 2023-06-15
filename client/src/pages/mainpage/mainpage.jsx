import { useEffect, useState } from "react";
import axios from "axios";
import "./mainpage.scss";
import Imageslider from "../../components/Imageslidermovies";
import RightMovieInfo from "../../components/RightMovieInfo";
import { Toggle } from "../../components/Toggle/Togglebtn";
import { Link } from "react-router-dom";

export default function Mainpage() {
	const [upcomingMovies, setUpcomingMovies] = useState();
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
		<div className="mainContent">
			<div className="mainContent__topWrapper">
				<div className="mainContent__leftWrapp">
					<Imageslider slider="2" />
				</div>
				<div className="mainContent__rightWrapp">
					<div className="mainContent__switchInput">
						<p>Movies</p>
						<Toggle />
						<p>TV Series</p>
					</div>
					<div className="mainContent__movieInfo">
						<RightMovieInfo slider="2" />
					</div>
				</div>
			</div>
		</div>
	);
}
