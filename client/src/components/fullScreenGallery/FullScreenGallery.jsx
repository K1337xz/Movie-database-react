import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
	faImage,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./fullscreengallery.scss";

export default function FullScreenGallery(props) {
	return (
		<div className="galleryFullScreen">
			<FontAwesomeIcon
				icon={faXmark}
				size="2xl"
				className="galleryFullScreen--closeBtn"
				onClick={props.closeFull}
			/>
			<div className="galleryFullScreen__wrapper">
				<span
					className="trailerSection__player--goBack"
					onClick={props.prevImage}
				>
					<FontAwesomeIcon icon={faChevronLeft} size="2xl" />
				</span>
				<img
					src={props.imageUrl}
					className="galleryFullScreen__image--active"
				/>
				<span
					className="trailerSection__player--goForward"
					onClick={props.nextImage}
				>
					<FontAwesomeIcon icon={faChevronRight} size="2xl" />
				</span>
			</div>
			<div className="gallery__wrapperThumbnails" ref={props.ref}>
				{props.thumbnails}
			</div>
		</div>
	);
}
