import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./searchitems.scss";

export default function SearchItems(props) {
	const api_image = `https://image.tmdb.org/t/p/w500`;

	return (
		<li className="searchMovie">
			<Link
				className="searchMovie__link"
				to={
					props.data.media_type === "tv"
						? `/s/${props.data.id}`
						: `/m/${props.data.id}`
				}
				reloadDocument
			>
				<div className="searchMovie__image">
					{!props.data.poster_path ? (
						<FontAwesomeIcon
							icon={faImage}
							className="searchMovie__image--emptyImg"
						/>
					) : (
						<img
							src={api_image + props.data.poster_path}
							loading="lazy"
							className="searchMovie__image--posterImage"
						/>
					)}
				</div>
				<div className="searchMovie__description">
					<span className="searchMovie__description--reliseDate">
						{!props.data.release_date
							? props.data.first_air_date
							: props.data.release_date}
					</span>
					<p className="searchMovie__description--title">
						{!props.data.title ? props.data.name : props.data.title}
					</p>
				</div>
			</Link>
		</li>
	);
}
