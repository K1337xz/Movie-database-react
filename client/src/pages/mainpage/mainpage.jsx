import "./mainpage.scss";
import toretoImg from "../../assets/Toreto.jpg";

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
					<div className="mainContent__switchInput"></div>
				</div>
			</div>
		</div>
	);
}
