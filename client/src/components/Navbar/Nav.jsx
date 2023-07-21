import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/coolmovielogo.svg";
import Searchbar from "../Searchbar/SearchBar";
import { useState, useEffect } from "react";
import scrollNav from "../../hooks/scrollNav/scrollNav";
import "./Nav.scss";

export default function Nav() {
	const [show, setShow] = useState(true);
	const scroll = scrollNav();
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	useEffect(() => {
		if (scroll.y > 0 && scroll.y - scroll.lastY > 0) {
			setShow(false);
		} else setShow(true);
	}, [scroll.y, scroll.lastY]);

	return (
		<header className={show ? "header active" : "header hidden"}>
			<nav className="nav">
				<div className="nav__logo">
					<Link to="/">
						<img src={logo} alt="logo image" />
					</Link>
				</div>
				<div className="nav__searchBar">
					<Searchbar />
					<div className="nav__searchResults">
						<h2>Movie</h2>
						<h2>Movie </h2>
						<h2>Movie </h2>
						<h2>Movie </h2>
						<h2>Movie </h2>
						<h2>Movie </h2>
					</div>
				</div>
				<ul className="nav__menu">
					<li className="nav__item-dropdownMovie">
						<Link>Movies</Link>
						<ul className="nav__menu-dropdownMovie">
							<li className="nav__dropdownItem">
								<Link to="/m/popular">Popular</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/m/top-rated">Top Rated</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/m/now-playing">Now Playing</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/m/upcoming">Upcoming</Link>
							</li>
						</ul>
					</li>
					<li className="nav__item-dropdownSeries">
						<Link>TV Shows</Link>
						<ul className="nav__menu-dropdownSeries">
							<li className="nav__dropdownItem">
								<Link to="/s/popular">Popular</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/s/top-rated">Top Rated</Link>
							</li>
							<li className="nav__dropdownItem">
								<Link to="/s/now-playing">Now Playing</Link>
							</li>
						</ul>
					</li>
					<li className="nav__item">
						<Link to="/signup">Sign Up</Link>
					</li>
				</ul>
				<FontAwesomeIcon
					icon={faBars}
					size="xl"
					color="#A8D9F0"
					className="openMenuMobile"
				/>
				<div className="navMobile">
					<div className="navMobile__top">
						<Link to="/">
							<img src={logo} alt="logo image" />
						</Link>
						<FontAwesomeIcon
							icon={faXmark}
							size="2xl"
							color="#E9F6FB"
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
									<Link to="/m/top-rated">Top Rated</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/m/now-playing">Now Playing</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/m/upcoming">Upcoming</Link>
								</li>
							</ul>
						</li>
						<li className="navMobile__item-dropdownSeries">
							<Link className="navMobile__item-dropDownFirst">
								TV Shows
							</Link>
							<ul className="navMobile__menu-dropdownSeries">
								<li className="navMobile__dropdownItem">
									<Link to="/s/popular">Popular</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/s/top-rated">Top Rated</Link>
								</li>
								<li className="navMobile__dropdownItem">
									<Link to="/s/now-playing">Now Playing</Link>
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
