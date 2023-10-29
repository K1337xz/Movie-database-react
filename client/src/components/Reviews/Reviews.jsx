import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/pngwing.com.png";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

export default function Reviews(props) {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className="review__card">
			<div className="review__top">
				{currentUser && currentUser.username === props.data.username ? (
					<div className="review__leftSide">
						<Link
							to={`/u/edit/${props.data.username}`}
							className="review__top--avatar"
						>
							<img
								src={props.data.img || user}
								alt="user avatar"
							/>
						</Link>

						<Link
							to={`/u/edit/${props.data.username}`}
							className="review__top--username"
						>
							{props.data.username}
						</Link>
						<span className="date">
							{new Date().toISOString().split("T")[0]}
						</span>
					</div>
				) : (
					<div className="review__leftSide">
						<Link
							to={`/u/${props.data.username}`}
							className="review__top--avatar"
						>
							<img
								src={props.data.img || user}
								alt="user avatar"
							/>
						</Link>

						<Link
							to={`/u/${props.data.username}`}
							className="review__top--username"
						>
							{props.data.username}
						</Link>
						<span className="date">
							{new Date().toISOString().split("T")[0]}
						</span>
					</div>
				)}

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
