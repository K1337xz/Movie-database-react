import user from "../../assets/pngwing.com.png";

export default function Reviews(props) {
	return (
		<div className="review__card">
			<div className="review__top">
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
			<div className="review__reviewcontent">{props.data.desc}</div>
		</div>
	);
}
