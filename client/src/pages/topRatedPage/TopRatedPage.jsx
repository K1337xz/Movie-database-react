import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./topratedpage.scss";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import CardWrapper from "../../components/CardWrapper/Cardwrapper";
import MoviesCard from "../../components/Moviecard/MoviesCard";
import Dropdownsortmenu from "../../components/dropdownSortMenu/Dropdownsortmenu";
import SceletonCards from "../../components/SceletonLoading/Sceleton_cards/SceletonCards";

export default function TopRatedPage() {
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [sortType, setSortType] = useState("");
	const [page, setPage] = useState(1);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const api_url = "";

	const toggleChange = (e) => {
		let sortValue = e.target.value;
		setSortType(e.target.value);
		setToggleDropDown(false);
		switch (sortValue) {
			case "Popularity Descending":
				setTopRatedMovies((prev) =>
					prev.sort((a, b) => b.popularity - a.popularity)
				);
				break;
			case "Popularity Ascending":
				setTopRatedMovies((prev) =>
					prev.sort((a, b) => a.popularity - b.popularity)
				);
				break;
			case "Rating Ascending":
				setTopRatedMovies((prev) =>
					prev.sort((a, b) => a.vote_average - b.vote_average)
				);

				break;
			case "Rating Descending":
				setTopRatedMovies((prev) =>
					prev.sort((a, b) => b.vote_average - a.vote_average)
				);
				break;
			case "Relase Date Descending":
				setTopRatedMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(b.release_date) - new Date(a.release_date)
					)
				);
				break;
			case "Relase Date Aescending":
				setTopRatedMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(a.release_date) - new Date(b.release_date)
					)
				);
				break;
			case "Title A-Z":
				setTopRatedMovies((prev) =>
					prev.sort((a, b) => a.title.localeCompare(b.title))
				);
				break;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			let newPage = [];
			try {
				const topRatedData = await axios.get(
					`https://api.themoviedb.org/3/movie/top_rated/`,
					{
						params: {
							api_key: import.meta.env.VITE_API_KEY,
							page: page,
						},
					}
				);
				newPage = topRatedData.data.results;
				if (page === 1) {
					setTopRatedMovies(newPage);
				} else {
					setTopRatedMovies((prev) => [...prev, ...newPage]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		console.log("i fire once");
		fetchData();
	}, [page]);

	const topRatedCard = topRatedMovies.map((data) => {
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
				<div className="topRated">
					<div className="topRated__topContent">
						<h1>Top Rated</h1>
						<div className="topRated__buttonsWrapper topRated__buttonsWrapper--open">
							<div className="topRated__sortOptions">
								<span
									className={
										toggleDropDown
											? "topRated__sortToggle--open"
											: "topRated__sortToggle"
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
					<div className="topRated__cards">
						<CardWrapper
							card={topRatedCard}
							style={{
								display: "none",
							}}
						/>
						<div className="topRated__buttonWrapper">
							<span
								className="topRated__buttonWrapper--button"
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
