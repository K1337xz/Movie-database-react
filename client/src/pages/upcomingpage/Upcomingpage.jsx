import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./upcomingpage.scss";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import Cardwrapper from "../../components/CardWrapper/Cardwrapper";
import MoviesCard from "../../components/Moviecard/MoviesCard";
import Dropdownsortmenu from "../../components/dropdownSortMenu/Dropdownsortmenu";
import SceletonCards from "../../components/SceletonLoading/Sceleton_cards/SceletonCards";

export default function Upcomingpage() {
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [sortType, setSortType] = useState("");
	const [page, setPage] = useState(1);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	let date = new Date().toISOString().split("T")[0];

	const toggleChange = (e) => {
		let sortValue = e.target.value;
		setSortType(e.target.value);
		setToggleDropDown(false);
		switch (sortValue) {
			case "Popularity Descending":
				setUpcomingMovies((prev) =>
					prev.sort((a, b) => b.popularity - a.popularity)
				);
				break;
			case "Popularity Ascending":
				setUpcomingMovies((prev) =>
					prev.sort((a, b) => a.popularity - b.popularity)
				);
				break;
			case "Rating Ascending":
				setUpcomingMovies((prev) =>
					prev.sort((a, b) => a.vote_average - b.vote_average)
				);

				break;
			case "Rating Descending":
				setUpcomingMovies((prev) =>
					prev.sort((a, b) => b.vote_average - a.vote_average)
				);
				break;
			case "Relase Date Descending":
				setUpcomingMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(b.release_date) - new Date(a.release_date)
					)
				);
				break;
			case "Relase Date Aescending":
				setUpcomingMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(a.release_date) - new Date(b.release_date)
					)
				);
				break;
			case "Title A-Z":
				setUpcomingMovies((prev) =>
					prev.sort((a, b) => a.title.localeCompare(b.title))
				);
				console.log(upcomingMovies);

				break;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			let newPage = [];
			try {
				const nowPlayingData = await axios.get(
					`https://api.themoviedb.org/3/movie/upcoming/`,
					{
						params: {
							api_key: import.meta.env.VITE_API_KEY,
							page: page,
							"primary_release_date.gte": date,
						},
					}
				);
				newPage = nowPlayingData.data.results;
				if (page === 1) {
					setUpcomingMovies(newPage);
				} else {
					setUpcomingMovies((prev) => [...prev, ...newPage]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [page]);

	const upcomingMoviesCard = upcomingMovies.map((data) => {
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
		setSortType("");
	};
	return (
		<>
			<Nav />
			<main className="container">
				<div className="upcoming">
					<div className="upcoming__topContent">
						<h1>Upcoming Movies</h1>
						<div className="upcoming__buttonsWrapper upcoming__buttonsWrapper--open">
							<div className="upcoming__sortOptions">
								<span
									className={
										toggleDropDown
											? "upcoming__sortToggle--open"
											: "upcoming__sortToggle"
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
					<div className="upcoming__cards">
						<Cardwrapper
							card={upcomingMoviesCard}
							style={{
								display: "none",
							}}
						/>
						<div className="upcoming__buttonWrapper">
							<span
								className="upcoming__buttonWrapper--button"
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
