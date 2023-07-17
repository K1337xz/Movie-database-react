import { useEffect, useState } from "react";
import axios from "axios";
import "./mainpage.scss";
import Imageslider from "../../components/Imageslidermovies";
import RightMovieInfo from "../../components/RightMovieInfo";
import { Toggle } from "../../components/Toggle/Togglebtn";
import Subnav from "../../components/Slidersubnav/Subnav";
import MovieCard from "../../components/Moviecard/MoviesCard";
import CardWrapper from "../../components/CardWrapper/cardWrapper";
import { Link } from "react-router-dom";

export default function Mainpage() {
	const [checked, setChecked] = useState(false);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [clickedNavValue, setclickedNavValue] = useState(0);
	const [activeSubnav, setActiveSubnav] = useState({
		first: true,
		second: false,
		third: false,
		fourth: false,
	});
	const api_url = "https://api.themoviedb.org/3/";
	let date = new Date().toISOString().split("T")[0];
	useEffect(() => {
		const fetchUpcomingMovie = async () => {
			try {
				const dataUpcoming = await axios.get(
					`${api_url}/movie/upcoming/`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				const dataNowPlaying = await axios.get(
					`${api_url}/movie/now_playing`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				const dataPopular = await axios.get(
					`${api_url}/movie/popular`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);

				const dataTopRated = await axios.get(
					`${api_url}/movie/top_rated`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				setUpcomingMovies(
					dataUpcoming.data.results.filter(
						(itm) => itm.release_date >= "2023-06-01"
					)
				);
				setNowPlayingMovies(dataNowPlaying.data.results);
				setPopularMovies(
					dataPopular.data.results
						.filter((item) => item.vote_average > 6.5)
						.sort((a, b) => b.vote_average - a.vote_average)
				);
				setTopRatedMovies(
					dataTopRated.data.results
						.filter((item) => item.vote_average > 6.5)
						.sort((a, b) => b.vote_average - a.vote_average)
				);
			} catch (error) {
				console.log;
			}
		};
		document.title = `CoolMovieDB`;
		fetchUpcomingMovie();
	}, []);

	const logState = (state) => {
		setChecked((state) => !state);
		console.log(state);
	};
	function toggleClick(e) {
		let clickedNav = e.target.innerText;
		if (clickedNav === "0") {
			setActiveSubnav((prev) => ({
				first: true,
				second: false,
				third: false,
				fourth: false,
			}));
		} else if (clickedNav === "1") {
			setActiveSubnav((prev) => ({
				first: false,
				second: true,
				third: false,
				fourth: false,
			}));
		} else if (clickedNav === "2") {
			setActiveSubnav((prev) => ({
				first: false,
				second: false,
				third: true,
				fourth: false,
			}));
		} else if (clickedNav === "3") {
			setActiveSubnav((prev) => ({
				first: false,
				second: false,
				third: false,
				fourth: true,
			}));
		}
		setclickedNavValue(clickedNav);
	}
	const nowPlayingCard = nowPlayingMovies.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/m/${data.id}`}
			/>
		);
	});
	const popularCard = popularMovies.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/m/${data.id}`}
			/>
		);
	});
	const upcomingCard = upcomingMovies.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/m/${data.id}`}
			/>
		);
	});
	const topRatedCard = topRatedMovies.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/m/${data.id}`}
			/>
		);
	});
	return (
		<>
			<div className="mainContent">
				<div className="mainContent__topWrapper">
					<div className="mainContent__leftWrapp">
						<Imageslider
							slider={clickedNavValue}
							state="true"
							check={checked}
						/>
						<div className="mainContent__subnav">
							<div className="subnav">
								<ul className="subnav__menu">
									<li
										className={
											activeSubnav.first
												? "subnav__item active"
												: "subnav__item"
										}
									>
										<span onClick={toggleClick}>0</span>
									</li>
									<li
										className={
											activeSubnav.second
												? "subnav__item active"
												: "subnav__item"
										}
									>
										<span onClick={toggleClick}>1</span>
									</li>
									<li
										className={
											activeSubnav.third
												? "subnav__item active"
												: "subnav__item"
										}
									>
										<span onClick={toggleClick}>2</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="mainContent__rightWrapp">
						<div className="mainContent__switchInput">
							<p>Movies</p>
							<Toggle label="Toggle me" onClick={logState} />
							<p>TV Series</p>
						</div>
						<div className="mainContent__movieInfo">
							<RightMovieInfo
								slider={clickedNavValue}
								check={checked}
							/>
						</div>
					</div>
				</div>
			</div>
			<CardWrapper header="NOW PLAYING" card={nowPlayingCard} />
			<CardWrapper header="POPULAR MOVIES" card={popularCard} />
			<CardWrapper header="UPCOMING MOVIES" card={upcomingCard} />
			<CardWrapper header="TOP RATED MOVIES" card={topRatedCard} />
		</>
	);
}
