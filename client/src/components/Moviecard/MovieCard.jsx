import "./moviecard.scss";
import user from "../../assets/pngwing.com.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function MovieCard(props) {
	const api_image = `https://image.tmdb.org/t/p/w500`;
	return (
		<li className="movieCard">
			<Link to={props.linkToMovie} reloadDocument>
				<div className="movieCard__image">
					{!props.data.poster_path ? (
						<div className="movieCard__image--empty">
							<FontAwesomeIcon
								icon={faImage}
								className="movieCard__image--emptyImg"
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
				<div className="movieCard__info">
					<p>{props.data.title}</p>
					<span>Relase Date: {props.data.release_date}</span>
				</div>
			</Link>
		</li>
	);
}
