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
			<span className="trailerSection__player--goBack">
				<FontAwesomeIcon icon={faChevronLeft} color="blue" size="2xl" />
			</span>
			<iframe
				src={`https://www.youtube.com/embed/${props.movieid}`}
				width={1000}
				height={500}
				allow="fullscreen"
			></iframe>
			<span className="trailerSection__player--goForward">
				<FontAwesomeIcon
					icon={faChevronRight}
					color="blue"
					size="2xl"
				/>
			</span>
		</div>
	);
}
