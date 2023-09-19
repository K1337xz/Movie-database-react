import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Imageslider from "../../components/ImageSlider";
import RightMovieInfo from "../../components/RightMovieInfo";
import MovieCard from "../../components/Moviecard/MoviesCard";
import Cardwrapper from "../../components/CardWrapper/Cardwrapper";
import SubNav from "../../components/Slidersubnav/SubNav";
import { Link } from "react-router-dom";
import SceletonCard from "../../components/SceletonLoading/Sceleton_card/SceletonCard";
import { getUpcoming, nowPlaying, popular, topRated } from "../../api/api";
import "./mainpage.scss";

export default function Mainpage() {
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [clickedNavValue, setclickedNavValue] = useState(0);
	const [loading, setLoading] = useState(true);
	const [activeSubnav, setActiveSubnav] = useState({
		first: true,
		second: false,
		third: false,
		fourth: false,
	});
	const { ref: scrollRef, inView: visibleElement } = useInView();
	const { ref: scrollCard, inView: visibleCardElement } = useInView();

	useEffect(() => {
		getUpcoming()
			.then((response) => setUpcomingMovies(response))
			.catch((e) => e);

		nowPlaying()
			.then((response) => setNowPlayingMovies(response))
			.catch((response) => response);
		popular()
			.then((response) => setPopularMovies(response))
			.catch((response) => response);
		topRated()
			.then((response) => setTopRatedMovies(response))
			.catch((response) => response);
	}, []);

	const logState = (state) => {
		setChecked((state) => !state);
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
			<div
				className={
					visibleElement ? "mainContent active" : "mainContent hidden"
				}
			>
				<div className="mainContent__topWrapper" ref={scrollRef}>
					<div className="mainContent__leftWrapp">
						<Imageslider slider={clickedNavValue} state="true" />
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
						<div className="mainContent__movieInfo">
							<RightMovieInfo slider={clickedNavValue} />
						</div>
					</div>
				</div>
			</div>

			<Cardwrapper
				header={"UPCOMING MOVIES"}
				card={upcomingCard}
				link="/m/upcoming"
			/>

			<Cardwrapper
				header="NOW PLAYING"
				card={nowPlayingCard}
				link="/m/now_playing"
			/>
			<Cardwrapper
				header="POPULAR MOVIES"
				card={popularCard}
				link="/m/popular"
			/>
			<Cardwrapper
				header="TOP RATED MOVIES"
				card={topRatedCard}
				link="/m/top_rated"
			/>
		</>
	);
}
