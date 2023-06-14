import "./mainpage.scss";
import toretoImg from "../../assets/Toreto.jpg";
import { Toggle } from "../../components/Toggle/Togglebtn";
import { Link } from "react-router-dom";
export default function Mainpage() {
	return (
		<div className="mainContent">
			<div className="mainContent__topWrapper">
				<div className="mainContent__leftWrapp">
					<img
						src={toretoImg}
						className="mainContent__imageBackground"
						alt="background movie image"
					/>
					<img
						src={toretoImg}
						className="mainContent__imageMain"
						alt="background movie image"
					/>
				</div>
				<div className="mainContent__rightWrapp">
					<div className="mainContent__switchInput">
						<p>Movies</p>
						<Toggle />
						<p>TV Series</p>
					</div>
					<div className="mainContent__movieInfo">
						<span>Action,Crime,Thriller</span>
						<h1>Fast X</h1>
						<p>
							Over many missions and against impossible odds, Dom
							Toretto and his family have outsmarted, out-nerved
							and outdriven every foe in their path.
						</p>
						<Link className="mainContent__loadMoreBtn">
							Read more
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
