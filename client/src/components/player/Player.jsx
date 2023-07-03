import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./player.scss";

//https://api.themoviedb.org/3/movie/{props.movieID}/videos
export default function Player(props) {
	return (
		<div className="trailerSection__player">
			<span
				className="trailerSection__player--goBack"
				onClick={props.toggleBack}
			>
				<FontAwesomeIcon icon={faChevronLeft} size="2xl" />
			</span>
			<iframe
				src={`https://www.youtube.com/embed/${props.movieid}?vq=hd1080`}
				width={1280}
				height={720}
				allow="fullscreen"
			></iframe>
			<span
				className="trailerSection__player--goForward"
				onClick={props.toggleForward}
			>
				<FontAwesomeIcon icon={faChevronRight} size="2xl" />
			</span>
		</div>
	);
}
