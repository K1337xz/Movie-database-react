import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./popularpage.scss";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import CardWrapper from "../../components/CardWrapper/Cardwrapper";
import MoviesCard from "../../components/Moviecard/MoviesCard";
import DropdownSortMenu from "../../components/dropdownSortMenu/DropdownSortMenu";
import SceletonCards from "../../components/SceletonLoading/Sceleton_cards/SceletonCards";

export default function PopularPage() {
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [sortType, setSortType] = useState("");
	const [page, setPage] = useState(1);
	const [popularMovies, setPopularMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const api_url = "https://api.themoviedb.org/3/";

	const toggleChange = (e) => {
		let sortValue = e.target.value;
		setSortType(e.target.value);
		setToggleDropDown(false);
		switch (sortValue) {
			case "Popularity Descending":
				setPopularMovies((prev) =>
					prev.sort((a, b) => b.popularity - a.popularity)
				);
				break;
			case "Popularity Ascending":
				setPopularMovies((prev) =>
					prev.sort((a, b) => a.popularity - b.popularity)
				);
				break;
			case "Rating Ascending":
				setPopularMovies((prev) =>
					prev.sort((a, b) => a.vote_average - b.vote_average)
				);

				break;
			case "Rating Descending":
				setPopularMovies((prev) =>
					prev.sort((a, b) => b.vote_average - a.vote_average)
				);
				break;
			case "Relase Date Descending":
				setPopularMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(b.release_date) - new Date(a.release_date)
					)
				);
				break;
			case "Relase Date Aescending":
				setPopularMovies((prev) =>
					prev.sort(
						(a, b) =>
							new Date(a.release_date) - new Date(b.release_date)
					)
				);
				break;
			case "Title A-Z":
				setPopularMovies((prev) =>
					prev.sort((a, b) => a.title.localeCompare(b.title))
				);
				break;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			let newPage = [];
			try {
				const popularData = await axios.get(
					`${api_url}/movie/popular/`,
					{
						params: {
							api_key: import.meta.env.VITE_API_KEY,
							page: page,
							"vote_count.gte": 500,
							"vote_average.gte": 7,
						},
					}
				);
				newPage = popularData.data.results;
				if (page === 1) {
					setPopularMovies(newPage);
				} else {
					setPopularMovies((prev) => [...prev, ...newPage]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		console.log("i fire once");
		fetchData();
	}, [page]);

	const popularCard = popularMovies.map((data) => {
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
				<div className="popularMovies">
					<div className="popularMovies__topContent">
						<h1>Popular Movies</h1>
						<div className="popularMovies__buttonsWrapper popularMovies__buttonsWrapper--open">
							<div className="popularMovies__sortOptions">
								<span
									className={
										toggleDropDown
											? "popularMovies__sortToggle--open"
											: "popularMovies__sortToggle"
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
									<DropdownSortMenu
										classDrop={"dropDownSort--open"}
										onChange={toggleChange}
									/>
								) : (
									<DropdownSortMenu
										classDrop={"dropDownSort"}
										onChange={toggleChange}
									/>
								)}
							</div>
						</div>
					</div>
					<div className="popularMovies__cards">
						<CardWrapper
							card={popularCard}
							style={{
								display: "none",
							}}
						/>
						<div className="popularMovies__buttonWrapper">
							<span
								className="popularMovies__buttonWrapper--button"
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
