import "./sceletonclickedcard.scss";

export default function SceletonClickedCard() {
	return (
		<div className="sceleton__topContent">
			<div className="sceleton__posterImage"></div>
			<div className="sceleton__rightMovieContent">
				<span className="sceleton__menuClicked"></span>
				<span className="sceleton__titleClicked"></span>
				<span className="sceleton__overviewClicked"></span>
				<div className="sceleton__directorClicked"></div>
			</div>
		</div>
	);
}
