import "./backdropgallery.scss";

export default function Backdropgallery(props) {
	return (
		<div className="thumbnails">
			<img
				src={`https://image.tmdb.org/t/p/w500${props.data.file_path}`}
			/>
		</div>
	);
}
