import axios from "axios";
import user from "../../assets/pngwing.com.png";
import "./review.scss";
export default function Review() {
	return (
		<div className="review">
			<div className="review__card">
				<div className="review__top">
					<a href="#" className="review__top--avatar">
						<img src={user} alt="user avatar" />
					</a>
					<a href="#" className="review__top--username">
						k1337xz
					</a>
					<span className="date">
						{new Date().toISOString().split("T")[0]}
					</span>
				</div>
				<div className="review__reviewcontent">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Integer laoreet magna eleifend magna sodales facilisis.
					Aliquam erat volutpat. Morbi vulputate nunc vitae mauris
					imperdiet, at placerat lectus faucibus. Integer sodales
					nulla sed purus aliquam posuere. Duis lacus massa, dignissim
					eu molestie sit amet, feugiat sed dui. Mauris nec dui orci.
					Fusce sollicitudin nisi sit amet arcu auctor, nec molestie
					purus posuere. Curabitur sem elit, consectetur quis viverra
					eu, mattis vitae ipsum. Etiam id justo massa.
				</div>
			</div>
			<div className="review__addReview">
				<div className="review__top">
					<a href="#" className="review__top--avatar">
						<img src={user} alt="user avatar" />
					</a>
					<a href="#" className="review__top--username">
						k1337xz
					</a>
				</div>
				<form className="review__form">
					<label htmlFor="review__inp">
						<textarea id="review__inp" name="review__inp" />
					</label>
				</form>
			</div>
		</div>
	);
}
