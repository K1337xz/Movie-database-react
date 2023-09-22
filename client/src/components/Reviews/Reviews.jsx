import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/pngwing.com.png";

export default function Reviews(props) {
	return (
		<div className="review__card">
			<div className="review__top">
				<div className="review__leftSide">
					<a href="#" className="review__top--avatar">
						<img src={props.data.img || user} alt="user avatar" />
					</a>
					<a href="#" className="review__top--username">
						{props.data.username}
					</a>
					<span className="date">
						{new Date().toISOString().split("T")[0]}
					</span>
				</div>
				<div className="review__rightSide">
					<FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
				</div>
			</div>
			<div className="review__reviewcontent">{props.data.desc}</div>
			<div className="review__edit">
				<p>Edit review</p>
				<p>Delete review</p>
			</div>
		</div>
	);
}
