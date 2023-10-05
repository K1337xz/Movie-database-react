import { useEffect, useState, useContext } from "react";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";
import { myApi } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import uploadFile from "../../firebase/uploadAvatar";

import "./modaladdimage.scss";
export default function ModalAddImage() {
	const { currentUser } = useContext(AuthContext);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [image, setImage] = useState(null);
	const [sendImage, setSendImage] = useState([]);
	const [cropImg, setCropImg] = useState([]);
	const [imageUrl, setImageUrl] = useState(null);
	const [succes, setSucces] = useState(false);

	const cropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};
	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0]));
			setSendImage(e.target.files[0]);
		}
	};

	const onCropChange = (crop) => {
		setCrop(crop);
	};
	const onZoomChange = (zoom) => {
		setZoom(zoom);
	};

	const cancelCrop = () => {
		setImage(null);
	};
	const onCrop = async () => {
		const { file } = await getCroppedImg(image, croppedAreaPixels);
		setCropImg(file);
		const url = await uploadFile(
			file,
			`profile/${currentUser.username}/avatar	}`
		);
		if (url) {
			setImageUrl(url);
		}
		try {
			await myApi.put(`/users/e/${currentUser.username}`, {
				img: url,
			});
			await myApi.put(`/reviews/e/${currentUser.username}`, {
				img: url,
			});
		} catch (error) {
			console.log(error);
		}
		setSucces(true);
	};
	useEffect(() => {
		if (succes) {
			const timer = setTimeout(() => {
				window.location.reload();
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [succes]);
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
								<button
									className="addImage__cropperContent--cancel"
									onClick={cancelCrop}
								>
									Cancel
								</button>
								<button
									className="addImage__cropperContent--submit"
									onClick={onCrop}
								>
									Add image
								</button>
							</div>
							{succes && (
								<div className="addImage__succes">
									<div className="addImage__succes-content">
										<p>Avatar updated! 📷 </p>
									</div>
								</div>
							)}
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
