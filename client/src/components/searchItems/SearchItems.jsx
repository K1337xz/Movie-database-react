import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SearchItems(props) {
	const api_image = `https://image.tmdb.org/t/p/w500`;

	return (
		<li className="searchMovie__card">
			<Link
				to={
					props.data.media_type === "tv"
						? `/s/${props.data.id}`
						: `/m/${props.data.id}`
				}
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
							width="100px"
						/>
					)}
				</div>
			</Link>
		</li>
	);
}
