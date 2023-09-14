import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";
import user from "../../assets/pngwing.com.png";
import axios from "axios";
import "./review.scss";
export default function Review() {
	const { currentUser } = useContext(AuthContext);
	const [formValue, setFormValues] = useState({
		postId: "",
		desc: "",
	});
	const postId = useParams();

	const sendReview = async (e) => {
		e.preventDefault();
		setFormValues((prev) => {
			return {
				postId: postId.id,
				desc: e.target[0].value,
			};
		});

		try {
			if (formValue) {
				await axios.post(
					"http://localhost:4000/api/v1/reviews",
					formValue,
					{
						withCredentials: true,
					}
				);
				e.target[0].value = "";
			}
		} catch (error) {
			console.log(error.response.data);
		}
	};
	return (
		<div className="review">
			{/* 			<div className="review__card">
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
			</div> */}
			{currentUser ? (
				<div className="review__addReview">
					<div className="review__top">
						<a href="#" className="review__top--avatar">
							<img src={currentUser.img || user} />
						</a>
						<a href="#" className="review__top--username">
							{currentUser.username}
						</a>
					</div>
					<form className="review__form" onSubmit={sendReview}>
						<label htmlFor="review__inp">
							<textarea id="review__inp" name="review__inp" />
						</label>
						<button className="review__button">Post review</button>
					</form>
				</div>
			) : (
				<div className="review__loginToAdd">
					<p>
						You need to <Link to="/login">Login</Link> to add review
					</p>
				</div>
			)}
		</div>
	);
}
