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
				<p className="footer__middle--firstParagraph">
					&copy; Jakub Buksa 2023
				</p>
				<p className="footer__middle--secondParagraph">
					This product uses the TMDB API but is not endorsed or
					certified by TMDB.
				</p>
			</div>
			<div className="footer__socials">
				<div className="footer__socials_wrapper">
					<Link
						to="https://github.com/K1337xz"
						target="_blank"
						className="footer__socials--link"
					>
						<FontAwesomeIcon
							icon={faGithub}
							size="2xl"
							className="footer__socials--image"
						/>
					</Link>
					<Link
						to="https://www.linkedin.com/in/jakub-buksa-673051257/"
						target="_blank"
						className="footer__socials--link"
					>
						<FontAwesomeIcon
							icon={faLinkedin}
							size="xl"
							className="footer__socials--image"
						/>
					</Link>
					<Link to="https://www.themoviedb.org/" target="_blank">
						<img
							src={movieDbLogo}
							alt="moviedb logo"
							className="footer__socials--logoMovie"
						/>
					</Link>
				</div>
			</div>
		</footer>
	);
}
