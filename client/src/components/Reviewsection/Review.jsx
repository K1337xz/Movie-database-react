import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";
import user from "../../assets/pngwing.com.png";
import { myApi } from "../../api/api";
import Reviews from "../Reviews/Reviews";
import "./review.scss";
export default function Review() {
	const { currentUser } = useContext(AuthContext);
	const [reviewsData, setReviewsData] = useState([]);
	const postId = useParams();
	const sendReview = async (e) => {
		e.preventDefault();
		try {
			await myApi.post("reviews", {
				postId: postId.id,
				username: currentUser.username,
				img: currentUser.img,
				desc: e.target[0].value,
			});
			e.target[0].value = "";
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const data = await myApi.get(`reviews/${postId.id}`);
				setReviewsData(data.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchReviews();
		console.log("xd");
	}, [reviewsData]);

	const reviewsCards = reviewsData.map((data) => {
		return <Reviews key={data._id} data={data} />;
	});

	return (
		<div className={currentUser ? "review active" : "review"}>
			{reviewsCards}
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
