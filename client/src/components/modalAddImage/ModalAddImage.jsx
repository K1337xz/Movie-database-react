import { useState } from "react";
import "./modaladdimage.scss";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";

export default function ModalAddImage() {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [image, setImage] = useState(null);
	const [cropImg, setCropImg] = useState([]);

	const cropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};
	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	const onCropChange = (crop) => {
		setCrop(crop);
	};
	const onZoomChange = (zoom) => {
		setZoom(zoom);
	};

	const onCrop = async () => {
		const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
		setCropImg(croppedImageUrl.url);
	};
	return (
		<>
			<div className="addImage">
				{image ? (
					<div className="addImage__cropper">
						<div className="addImage__cropperContent">
							<div className="addImage__cropperContent-image">
								<Cropper
									image={image}
									crop={crop}
									zoom={zoom}
									showGrid={false}
									onCropChange={onCropChange}
									onZoomChange={onZoomChange}
									onCropComplete={cropComplete}
								/>
							</div>
							<div className="addImage__cropperContent-buttons">
								<button className="addImage__cropperContent--cancel">
									Cancel
								</button>
								<button
									className="addImage__cropperContent--submit"
									onClick={onCrop}
								>
									Add image
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="addImage__content">
						<input
							name=""
							type="file"
							id="formId"
							onChange={onImageChange}
						/>
					</div>
				)}
			</div>
		</>
	);
}
