import { useEffect, useState } from "react";
import axios from "axios";
import "./mainpage.scss";
import Imageslider from "../../components/Imageslidermovies";
import RightMovieInfo from "../../components/RightMovieInfo";
import { Toggle } from "../../components/Toggle/Togglebtn";
import Subnav from "../../components/Slidersubnav/Subnav";

export default function Mainpage() {
	const [clickedNavValue, setclickedNavValue] = useState(0);
	const [upcomingMovies, setUpcomingMovies] = useState();
	const api_url = "https://api.themoviedb.org/3/";
	useEffect(() => {
		const fetchUpcomingMovie = async () => {
			try {
				const data = await axios.get(`${api_url}/movie/upcoming/`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});

				setUpcomingMovies(data.data.results);
			} catch (error) {
				console.log;
			}
		};
		fetchUpcomingMovie();
	}, []);

	function toggleClick(e) {
		console.log(e.target.offsetParent);
		setclickedNavValue(e.target.innerText);
	}

	return (
		<div className="mainContent">
			<div className="mainContent__topWrapper">
				<div className="mainContent__leftWrapp">
					<Imageslider slider={clickedNavValue} />
					<div className="mainContent__subnav">
						<div className="subnav">
							<ul className="subnav__menu">
								<li className="subnav__item active">
									<span onClick={toggleClick}>0</span>
								</li>
								<li className="subnav__item">
									<span onClick={toggleClick}>1</span>
								</li>
								<li className="subnav__item">
									<span onClick={toggleClick}>2</span>
								</li>
								<li className="subnav__item">
									<span onClick={toggleClick}>3</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mainContent__rightWrapp">
					<div className="mainContent__switchInput">
						<p>Movies</p>
						<Toggle />
						<p>TV Series</p>
					</div>
					<div className="mainContent__movieInfo">
						<RightMovieInfo slider={clickedNavValue} />
					</div>
				</div>
			</div>
		</div>
	);
}
