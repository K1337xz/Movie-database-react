import "./castslider.scss";
import user from "../../assets/pngwing.com.png";

export default function CastSlider(props) {
	const api_image = `https://image.tmdb.org/t/p/w500`;
	return (
		<li className="castSlider__card">
			<div
				className={
					!props.dataCast.profile_path
						? "castSlider__card_image--empty"
						: "castSlider__card_image"
				}
			>
				<img
					src={
						!props.dataCast.profile_path
							? user
							: api_image + props.dataCast.profile_path
					}
					loading="lazy"
				/>
			</div>
			<div className="castSlider__card_characterInfo">
				<p>{props.dataCast.name}</p>
				<span>{props.dataCast.character}</span>
			</div>
		</li>
	);
}
