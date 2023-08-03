import "./cardwrapper.scss";
import { Link } from "react-router-dom";

export default function CardWrapper(props) {
	return (
		<div className="cardsMain">
			<div className="cardsMain__topContent">
				<h2>{props.header}</h2>
				<Link
					to={props.link}
					className="loadMoreBtn"
					style={props.style}
				>
					Load More
				</Link>
			</div>
			<div className="cardsMain__cardContent">
				<ul className="cardsMain__cardMenu">{props.card}</ul>
			</div>
		</div>
	);
}
