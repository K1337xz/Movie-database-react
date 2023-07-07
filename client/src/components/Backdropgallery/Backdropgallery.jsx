import "./backdropgallery.scss";
import { forwardRef } from "react";

function Backdropgallery(props, ref) {
	return (
		<div className={props.wrapperClass} onClick={props.heh} ref={ref}>
			<img
				src={`https://image.tmdb.org/t/p/w200${props.data.file_path}`}
				className="thumbnail__images"
			/>
		</div>
	);
}

export default forwardRef(Backdropgallery);
