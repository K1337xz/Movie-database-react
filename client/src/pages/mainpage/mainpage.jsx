import { useEffect, useState } from "react";
import axios from "axios";
import "./mainpage.scss";
import Imageslider from "../../components/Imageslidermovies";
import RightMovieInfo from "../../components/RightMovieInfo";
import { Toggle } from "../../components/Toggle/Togglebtn";
import Subnav from "../../components/Slidersubnav/Subnav";

export default function Mainpage() {
	const [checked, setChecked] = useState(false);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [clickedNavValue, setclickedNavValue] = useState(0);
	const [activeSubnav, setActiveSubnav] = useState({
		first: true,
		second: false,
		third: false,
		fourth: false,
	});

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

	return (
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
								<li
									className={
										activeSubnav.fourth
											? "subnav__item active"
											: "subnav__item"
									}
								>
									<span onClick={toggleClick}>3</span>
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
	);
}
