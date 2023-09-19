import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./player.scss";

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
				className="video"
				title="Youtube player"
				sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
				src={`https://youtube.com/embed/${props.movieid}?autoplay=0`}
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
