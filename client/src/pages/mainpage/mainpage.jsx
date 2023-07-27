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
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [airingTodaySeries, setAiringTodaySeries] = useState([]);
	const [popularS, setPopularS] = useState([]);
	const [topRatedS, setTopRatedS] = useState([]);
	const [clickedNavValue, setclickedNavValue] = useState(0);
	const [activeSubnav, setActiveSubnav] = useState({
		first: true,
		second: false,
		third: false,
		fourth: false,
	});
	const api_url = "https://api.themoviedb.org/3/";
	let date = new Date().toISOString().split("T")[0];

	const fetchData = () => {
		//movies calls from moviedb api
		const upcomingMovies = `${api_url}/movie/upcoming/`;
		const nowPlaying = `${api_url}/movie/now_playing/`;
		const popularMovies = `${api_url}/movie/popular/`;
		const topRated = `${api_url}/movie/top_rated/`;
		//tv series calls from moviedb api
		const airingToday = `${api_url}/tv/airing_today`;
		const popularSeries = `${api_url}/tv/popular/`;
		const topRatedSeries = `${api_url}/tv/top_rated/`;

		//movie calls
		const getUpocmingMovies = axios.get(upcomingMovies, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});
		const getNowPlaying = axios.get(nowPlaying, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});
		const getPopularMovies = axios.get(popularMovies, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});
		const getTopRatedMovies = axios.get(topRated, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});

		//tv series calls
		const getAiringToday = axios.get(airingToday, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});

		const getPopularSeries = axios.get(popularSeries, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});
		const getRopRatedSeries = axios.get(topRatedSeries, {
			params: { api_key: import.meta.env.VITE_API_KEY },
		});
		axios
			.all([
				getUpocmingMovies,
				getNowPlaying,
				getPopularMovies,
				getTopRatedMovies,
				getAiringToday,
				getPopularSeries,
				getRopRatedSeries,
			])
			.then(
				axios.spread((...allData) => {
					setUpcomingMovies(
						allData[0].data.results.filter(
							(itm) => itm.release_date >= "2023-06-01"
						)
					);
					setNowPlayingMovies(allData[1].data.results);
					setPopularMovies(
						allData[2].data.results
							.filter((item) => item.vote_average > 6.5)
							.sort((a, b) => b.vote_average - a.vote_average)
					);
					setTopRatedMovies(
						allData[3].data.results
							.filter((item) => item.vote_average > 6.5)
							.sort((a, b) => b.vote_average - a.vote_average)
					);
					setAiringTodaySeries(allData[4].data.results);

					setPopularS(
						allData[5].data.results
							.filter((item) => item.vote_average > 6.5)
							.sort((a, b) => b.vote_average - a.vote_average)
					);
					setTopRatedS(allData[6].data.results);
				})
			);
	};

	useEffect(() => {
		fetchData();
		document.title = `CoolMovieDB`;
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
	const airingTodaySeriesCard = airingTodaySeries.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/s/${data.id}`}
			/>
		);
	});
	const popularSeriesCard = popularS.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/s/${data.id}`}
			/>
		);
	});
	const topRatedSeries = topRatedS.slice(0, 6).map((data) => {
		return (
			<MovieCard
				key={data.id}
				data={data}
				linkToMovie={`/s/${data.id}`}
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
			<CardWrapper
				header={checked ? "AIRING TODAY" : "NOW PLAYING"}
				card={checked ? airingTodaySeriesCard : nowPlayingCard}
			/>
			<CardWrapper
				header={checked ? "POPULAR SERIES" : "POPULAR MOVIES"}
				card={checked ? popularSeriesCard : popularCard}
			/>
			{!checked && (
				<CardWrapper header={"UPCOMING MOVIES"} card={upcomingCard} />
			)}
			<CardWrapper
				header={checked ? "TOP RATED SERIES" : "TOP RATED MOVIES"}
				card={checked ? topRatedSeries : topRatedCard}
			/>
		</>
	);
}
