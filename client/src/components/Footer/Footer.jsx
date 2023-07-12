import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/coolmovielogo.svg";
import movieDbLogo from "../../assets/moviedbx.svg";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer__nav">
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<div className="footer__middle">
				<p>&copy; Jakub Buksa 2023</p>
				<p>
					This product uses the TMDB API but is not endorsed or
					certified by TMDB.
				</p>
			</div>
			<div>
				<Link to="https://github.com/K1337xz" target="_blank">
					<FontAwesomeIcon icon={faGithub} size="2xl" />
				</Link>
				<Link to="">
					<FontAwesomeIcon icon={faLinkedin} size="2xl" />
				</Link>
				<Link to="https://www.themoviedb.org/" target="_blank">
					<img src={movieDbLogo} alt="moviedb logo" />
				</Link>
			</div>
		</footer>
	);
}
