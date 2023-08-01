import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./nowplaying.scss";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";

export default function NowPlaying() {
	return (
		<>
			<Nav />
			<main className="container">
				<div className="nowPlaying">
					<div className="nowPlaying__topContent">
						<h1>Now Playing</h1>
						<div className="nowPlaying__buttonsWrapper nowPlaying__buttonsWrapper--open">
							<div className="nowPlaying__sortOptions">
								<select className="nowPlaying__selectSort">
									<option value="select">Sort By</option>
									<option value="popularityDescending">
										Popularity Descending
									</option>
									<option value="popularityAscending">
										Popularity Ascending
									</option>
									<option value="ratingAscending">
										Rating Ascending
									</option>
									<option value="ratingAscending">
										Rating Ascending
									</option>
									<option value="relaseDateDescending">
										Relase Date Ascending
									</option>
									<option value="relaseDateDescending">
										Relase Date Ascending
									</option>
									<option value="titleAZ">Title (A-Z)</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
