import "./smilarcard.scss";
import user from "../../assets/pngwing.com.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Smilarcard(props) {
	const api_image = `https://image.tmdb.org/t/p/w500`;
	return (
		<li className="smilar">
			<Link to={props.linkToMovie} reloadDocument>
				<div className="smilar__image">
					{!props.data.poster_path ? (
						<div className="smilar__image--empty">
							<FontAwesomeIcon
								icon={faImage}
								className="smilar__image--emptyImg"
							/>
						</div>
					) : (
						<img
							src={
								!props.data.poster_path
									? user
									: api_image + props.data.poster_path
							}
							loading="lazy"
						/>
					)}
				</div>
			</Link>
		</li>
	);
}
