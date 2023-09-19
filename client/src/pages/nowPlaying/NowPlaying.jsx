import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./nowplaying.scss";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import CardWrapper from "../../components/CardWrapper/Cardwrapper";
import MoviesCard from "../../components/Moviecard/MoviesCard";
import Dropdownsortmenu from "../../components/dropdownSortMenu/Dropdownsortmenu";
import SceletonCards from "../../components/SceletonLoading/Sceleton_cards/SceletonCards";

export default function NowPlaying() {
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [sortType, setSortType] = useState("");
	const [page, setPage] = useState(1);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const api_url = "https://api.themoviedb.org/3/";

	const toggleChange = (e) => {
		let sortValue = e.target.value;
		setSortType(e.target.value);
		setToggleDropDown(false);
		switch (sortValue) {
			case "Popularity Descending":
				setNowPlayingMovies((prev) =>
					prev.sort((a, b) => b.popularity - a.popularity)
				);
				break;
			case "Popularity Ascending":
				setNowPlayingMovies((prev) =>
					prev.sort((a, b) => a.popularity - b.popularity)
				);
				break;
			case "Rating Ascending":
				setNowPlayingMovies((prev) =>
					prev.sort((a, b) => a.vote_average - b.vote_average)
				);

				break;
			case "Rating Descending":
				setNowPlayingMovies((prev) =>
					prev.sort((a, b) => b.vote_average - a.vote_average)
				);
				break;
			case "Relase Date Descending":
				setNowPlayingMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(b.release_date) - new Date(a.release_date)
					)
				);
				break;
			case "Relase Date Aescending":
				setNowPlayingMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(a.release_date) - new Date(b.release_date)
					)
				);
				break;
			case "Title A-Z":
				setNowPlayingMovies((prev) =>
					prev.sort((a, b) => a.title.localeCompare(b.title))
				);
				console.log(nowPlayingMovies);

				break;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			let newPage = [];
			try {
				const nowPlayingData = await axios.get(
					`${api_url}/movie/now_playing/`,
					{
						params: {
							api_key: import.meta.env.VITE_API_KEY,
							page: page,
						},
					}
				);
				newPage = nowPlayingData.data.results;
				if (page === 1) {
					setNowPlayingMovies(newPage);
				} else {
					setNowPlayingMovies((prev) => [...prev, ...newPage]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [page]);

	const nowPlayingCard = nowPlayingMovies.map((data) => {
		return (
			<MoviesCard
				key={data.id}
				data={data}
				linkToMovie={`/m/${data.id}`}
			/>
		);
	});
	const loadMore = () => {
		setPage((prev) => prev + 1);
	};
	return (
		<>
			<Nav />
			<main className="container">
				<div className="nowPlaying">
					<div className="nowPlaying__topContent">
						<h1>Now Playing</h1>
						<div className="nowPlaying__buttonsWrapper nowPlaying__buttonsWrapper--open">
							<div className="nowPlaying__sortOptions">
								<span
									className={
										toggleDropDown
											? "nowPlaying__sortToggle--open"
											: "nowPlaying__sortToggle"
									}
									onClick={() => {
										setToggleDropDown(
											(prev) => (prev = !prev)
										);
									}}
								>
									{sortType.length > 0 ? sortType : "Sort By"}
								</span>
								{toggleDropDown ? (
									<Dropdownsortmenu
										classDrop={"dropDownSort--open"}
										onChange={toggleChange}
									/>
								) : (
									<Dropdownsortmenu
										classDrop={"dropDownSort"}
										onChange={toggleChange}
									/>
								)}
							</div>
						</div>
					</div>
					<div className="nowPlaying__cards">
						<CardWrapper
							card={nowPlayingCard}
							style={{
								display: "none",
							}}
						/>
						<div className="nowPlaying__buttonWrapper">
							<span
								className="nowPlaying__buttonWrapper--button"
								onClick={loadMore}
							>
								Load More!
							</span>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
