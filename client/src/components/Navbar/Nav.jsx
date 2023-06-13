import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/coolmovielogo.svg";
import "./Nav.scss";

export default function Nav() {
	return (
		<header className="header">
			<nav className="nav">
				<div className="nav__logo">
					<Link to="/">
						<img src={logo} alt="logo image" />
					</Link>
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
			</nav>
		</header>
	);
}
