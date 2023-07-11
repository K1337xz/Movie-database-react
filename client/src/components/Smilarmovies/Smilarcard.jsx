import "./smilarcard.scss";
import user from "../../assets/pngwing.com.png";
import { Link } from "react-router-dom";
export default function Smilarcard(props) {
	const api_image = `https://image.tmdb.org/t/p/w500`;
	return (
		<li className="smilar">
			<Link to={props.linkToMovie} reloadDocument>
				<div className="smilar__image">
					<img
						src={
							!props.data.poster_path
								? user
								: api_image + props.data.poster_path
						}
						loading="lazy"
					/>
				</div>
			</Link>
		</li>
	);
}
