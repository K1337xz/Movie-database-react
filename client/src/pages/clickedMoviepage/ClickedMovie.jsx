import { useEffect, useState, useRef, createRef } from "react";
import Castslider from "../../components/castSlider/Castslider";
import Player from "../../components/player/Player";
import { Toggle } from "../../components/Toggle/Togglebtn";
import Nav from "../../components/Navbar/Nav";
import Backdropgallery from "../../components/Backdropgallery/Backdropgallery";
import SceletonClickedCard from "../../components/SceletonLoading/Sceleton_clickedCard/SceletonClickedCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./clickedmovie.scss";

export default function ClickedMovie() {
	const movieId = window.location.pathname.slice(3);
	const api_imageWidth500 = `https://image.tmdb.org/t/p/w500`;
	const api_imageWidthOrginal = `https://image.tmdb.org/t/p/original`;
	const api_url = "https://api.themoviedb.org/3/";
	const [clickedMovie, setClickedMovie] = useState([]);
	const [cast, setCast] = useState([]);
	const [directors, setDirectors] = useState([]);
	const [videos, setVideos] = useState([]);
	const [images, setImages] = useState([]);
	const directName = directors[0] ? directors[0].name : "";
	const [checked, setChecked] = useState(false);
	const [clickedTrailer, setClickedTrailer] = useState(0);
	const [mainGalleryImage, setMainGalleryImage] = useState(0);
	const [loading, setLoading] = useState();
	const divScroll = useRef(null);
	const myStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `linear-gradient(0deg, rgba(233, 246, 251, 0.3), rgba(39, 161, 218, 0.9)), url(${api_imageWidth500}/${clickedMovie.backdrop_path}) `,
		width: "100%",
		height: "100%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};
	const logState = (state) => {
		setChecked((state) => !state);
	};

	useEffect(() => {
		const fetchMovie = async () => {
			setLoading(true);
			try {
				const data = await axios.get(`${api_url}/movie/${movieId}`, {
					params: { api_key: import.meta.env.VITE_API_KEY },
				});
				const creditsData = await axios.get(
					`${api_url}/movie/${movieId}/credits`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				const dataVideos = await axios.get(
					`${api_url}/movie/${movieId}/videos`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				const dataImages = await axios.get(
					`${api_url}/movie/${movieId}/images`,
					{
						params: { api_key: import.meta.env.VITE_API_KEY },
					}
				);
				setImages(dataImages.data.backdrops);
				setClickedMovie(data.data);
				setCast(creditsData.data.cast);
				setDirectors(
					creditsData.data.crew.filter(
						(item) => item.job === "Director"
					)
				);
				setVideos(
					dataVideos.data.results.filter(
						(item) =>
							item.type === "Trailer" || item.type === "Teaser"
					)
				);
				setLoading(false);
				document.title = `${data.data.title}`;
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovie();
	}, []);

	const toggleForward = () => {
		if (clickedTrailer === videos.length - 1) {
			setClickedTrailer((prev) => (prev = 0));
		} else {
			setClickedTrailer((prev) => (prev += 1));
		}
	};

	const toggleBack = () => {
		if (clickedTrailer === 0) {
			setClickedTrailer((prev) => (prev = videos.length - 1));
		} else {
			setClickedTrailer((prev) => (prev -= 1));
		}
	};
	const nextImage = () => {
		if (mainGalleryImage === images.length - 1) {
			setMainGalleryImage((prev) => (prev = 0));
			thumbRef.current[mainGalleryImage].scrollTo({
				behavior: "smooth",
				inline: "start",
			});
		} else {
			setMainGalleryImage((prev) => (prev += 1));
			thumbRef.current[mainGalleryImage].current.scrollIntoView({
				behavior: "smooth",
				inline: "start",
			});
		}
	};
	const prevImage = () => {
		if (mainGalleryImage === 0) {
			setMainGalleryImage((prev) => (prev = images.length - 1));
		} else {
			setMainGalleryImage((prev) => (prev -= 1));
			thumbRef.current[mainGalleryImage].current.scrollIntoView({
				behavior: "smooth",
				inline: "end",
			});
		}
	};
	const cardCast = cast.slice(0, 10).map((dataCast) => {
		return <Castslider key={dataCast.id} dataCast={dataCast} />;
	});

	const cardFullCast = cast.map((dataCast) => {
		return <Castslider key={dataCast.id} dataCast={dataCast} />;
	});

	const thumbRef = useRef([]);
	useEffect(() => {
		thumbRef.current = Array(images.length)
			.fill()
			.map((_, index) => thumbRef.current[index] || createRef());
	}, [images.length]);
	const cardImages = images.map((data, index) => {
		return (
			<Backdropgallery
				key={data.file_path}
				data={data}
				heh={(e) => {
					let pathIndex = images.findIndex(
						(itm) => itm.file_path === data.file_path
					);
					setMainGalleryImage((prev) => (prev = pathIndex));
					e.target.scrollIntoView({
						behavior: "smooth",
						inline: "center",
					});
				}}
				wrapperClass={
					images[mainGalleryImage].file_path === data.file_path
						? "thumbnail active"
						: "thumbnail"
				}
				ref={thumbRef.current[index]}
			/>
		);
	});

	return (
		<>
			<Nav />
			<main className="container">
				<div className="clickedMovie">
					<div className="clickedMovie__top" style={myStyle}>
						{loading ? (
							<SceletonClickedCard />
						) : (
							<div className="clickedMovie__topContent">
								<div className="clickedMovie__posterImage">
									<img
										src={`${api_imageWidth500}${clickedMovie.poster_path}`}
										alt={`${clickedMovie.title} poster image`}
										className="clickedMovie__posterImage--image"
									/>
								</div>
								<div className="clickedMovie__rightMovieContent">
									<ul className="clickedMovie__rightMovieContent--menu">
										{clickedMovie.genres
											? clickedMovie.genres.map((itm) => (
													<li key={itm.id}>
														{itm.name},
													</li>
											  ))
											: "No genres"}
									</ul>
									<h1>{clickedMovie.title}</h1>
									<p className="clickedMovie__rightMovieContent--overview">
										{clickedMovie.overview}
									</p>
									<div className="clickedMovie__rightMovieContent--director">
										<p>Director</p>
										<p>{directName}</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="castSlider">
					<div className="castSlider__sliderTopContent">
						<h2>CAST</h2>
						<div className="castSlider__toggleBtn">
							<Toggle label="Toggle me" onClick={logState} />
							<p>Full cast</p>
						</div>
					</div>
					<div
						className={
							checked
								? "castSlider__slider--full"
								: "castSlider__slider"
						}
					>
						<ul
							className={
								checked
									? "castSlider__menu--fullCast"
									: "castSlider__menu"
							}
						>
							{checked ? cardFullCast : cardCast}
						</ul>
					</div>
				</div>
				<div className="trailerSection">
					<div className="trailerSection__topContent">
						<h2>VIDEOS</h2>
					</div>
					<div className="trailerSection__playerContent">
						<Player
							movieid={
								videos.length > 0
									? videos[clickedTrailer].key
									: "x"
							}
							toggleForward={toggleForward}
							toggleBack={toggleBack}
						/>
					</div>
				</div>
				<div className="backdropsSection">
					<div className="backdropsSection__topContent">
						<h2>BACKDROPS</h2>
					</div>
					<div className="gallery">
						<div className="gallery__mainImg">
							<span
								className="trailerSection__player--goBack"
								onClick={prevImage}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									size="2xl"
								/>
							</span>
							<img
								src={
									images.length > 0
										? `${api_imageWidthOrginal}${images[mainGalleryImage].file_path}`
										: ""
								}
								className="gallery__image--active"
							/>
							<span
								className="trailerSection__player--goForward"
								onClick={nextImage}
							>
								<FontAwesomeIcon
									icon={faChevronRight}
									size="2xl"
								/>
							</span>
						</div>
						<div className="gallery__thumbnails">
							<div
								className="gallery__wrapperThumbnails"
								ref={divScroll}
							>
								{cardImages}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
