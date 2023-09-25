import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faXmark,
	faMagnifyingGlass,
	faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import logo from "../../assets/coolmovielogo.svg";
import scrollNav from "../../hooks/scrollNav/scrollNav";
import SearchItems from "../searchItems/SearchItems";
import noavatar from "../../assets/pngwing.com.png";
import "./nav.scss";

export default function Nav() {
	const [show, setShow] = useState(true);
	const [showSearch, setShowSearch] = useState(true);
	const [showSearchMobile, setShowSearchMobile] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [toggleDropLogout, setToggleDropLogout] = useState(false);
	const scroll = scrollNav();
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const [searchData, setSearchData] = useState([]);
	const api_url = "https://api.themoviedb.org/3/";
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (scroll.y > 0 && scroll.y - scroll.lastY > 0) {
			setShow(false);
			setShowSearch(false);
		} else {
			setShow(true);
		}
	}, [scroll.y, scroll.lastY]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (searchValue) {
					const getSearch = await axios.get(
						`${api_url}/search/multi`,
						{
							params: {
								api_key: import.meta.env.VITE_API_KEY,
								query: searchValue,
							},
						}
					);
					setSearchData(getSearch.data.results);
				} else {
					return;
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		if (searchValue.length > 0) {
			setShowSearch(true);
		} else {
			setShowSearch(false);
		}
	}, [searchValue]);
	const logState = (e) => {
		setSearchValue(e.target.value);
	};
	const searchCard = searchData.map((data) => {
		return <SearchItems key={data.id} data={data} />;
	});

	return (
		<header className={show ? "header active" : "header hidden"}>
			<nav className="nav">
				<div className="nav__logo">
					<Link to="/">
						<img src={logo} alt="logo image" />
					</Link>
				</div>
				<div className="nav__searchBar">
					<div
						className={
							showSearchMobile
								? "nav__searchWrapper show"
								: "nav__searchWrapper hidden"
						}
					>
						<input
							type="text"
							placeholder="Search for a movie etc..."
							value={searchValue}
							onChange={logState}
						/>
						<FontAwesomeIcon
							icon={faXmark}
							size="sm"
							color="#E9F6FB"
							onClick={() => {
								setShowSearchMobile(false);
								setShowSearch(false);
							}}
							className="nav__searchBar--close"
						/>
					</div>
					{showSearch && (
						<div className="nav__searchResults">
							<ul className="nav__searchMenu">
								{searchData.length === 0
									? "No value found"
									: searchCard}
							</ul>
						</div>
					)}
				</div>
				<ul className="nav__menu">
					<li className="nav__item">
						{showSearchMobile ? null : (
							<FontAwesomeIcon
								icon={faMagnifyingGlass}
								size="xl"
								color="#A8D9F0"
								className="showInputD"
								onClick={() =>
									setShowSearchMobile((prev) => !prev)
								}
							/>
						)}
					</li>
					<li
						className={
							toggleDropDown
								? "nav__item-dropdownMovie activeMenu"
								: "nav__item-dropdownMovie"
						}
						onClick={() => setToggleDropDown(true)}
					>
						<Link>Movies</Link>
						<ul
							className="nav__menu-dropdownMovie"
							onMouseLeave={() => setToggleDropDown(false)}
						>
							<li className="nav__dropdownItem">
								<Link to="/m/popular">Popular</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/m/top_rated">Top Rated</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/m/now_playing">Now Playing</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/m/upcoming">Upcoming</Link>
							</li>
						</ul>
					</li>
					{currentUser ? (
						<li className="nav__item-user">
							<div className="nav__item-userImage">
								<Link to={`/u/edit/${currentUser.username}`}>
									<img
										src={currentUser.img || noavatar}
										className="nav__profileImage"
									/>
								</Link>
							</div>
							<div className="nav__item-userUsername">
								<Link to={`/u/edit/${currentUser.username}`}>
									{currentUser.username}
								</Link>
								<FontAwesomeIcon
									icon={faChevronDown}
									className={
										toggleDropLogout
											? "nav__itemBtn--open"
											: "nav__itemBtn--close"
									}
									onClick={() => {
										setToggleDropLogout((prev) => !prev);
									}}
								/>
							</div>
							<div
								className={
									toggleDropLogout
										? "nav__item-dropdown"
										: "nav__item-dropdown--close"
								}
							>
								<span>Logout</span>
							</div>
						</li>
					) : (
						<li className="nav__item">
							<Link to="/signup">Sign Up</Link>
						</li>
					)}
				</ul>
				{showSearchMobile ? null : (
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						size="xl"
						color="#A8D9F0"
						className="showInput"
						onClick={() => setShowSearchMobile((prev) => !prev)}
					/>
				)}
				<FontAwesomeIcon
					icon={faBars}
					size="xl"
					color="#A8D9F0"
					className="openMenuMobile"
					onClick={() => setShowMobileMenu(true)}
				/>
				<div
					className={
						showMobileMenu ? "navMobile active" : "navMobile hidden"
					}
				>
					<div className="navMobile__top">
						<Link to="/">
							<img src={logo} alt="logo image" />
						</Link>
						<FontAwesomeIcon
							icon={faXmark}
							size="2xl"
							color="#E9F6FB"
							onClick={() => setShowMobileMenu(false)}
						/>
					</div>
					<ul className="navMobile__menu">
						<li className="navMobile__item-dropdownMovie">
							<Link className="navMobile__item-dropDownFirst">
								Movies
							</Link>
							<ul className="navMobile__menu-dropdownMovie">
								<li className="navMobile__dropdownItem">
									<Link to="/m/popular">Popular</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/m/top_rated">Top Rated</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/m/now_playing">Now Playing</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/m/upcoming">Upcoming</Link>
								</li>
							</ul>
						</li>
						<li className="navMobile__itemSign">
							<Link to="/signup">Sign Up</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
