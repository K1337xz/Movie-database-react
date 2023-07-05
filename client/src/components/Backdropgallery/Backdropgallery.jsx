import "./backdropgallery.scss";

export default function Backdropgallery(props) {
	return (
		<div className={props.wrapperClass} onClick={props.heh}>
			<img
				src={`https://image.tmdb.org/t/p/w200${props.data.file_path}`}
				className="thumbnail__images"
			/>
		</div>
	);
}
