import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./nowplaying.scss";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import DropdownSortMenu from "../../components/dropdownSortMenu/dropdownSortMenu";

export default function NowPlaying() {
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [sortType, setSortType] = useState("");
	const toggleChange = (e) => {
		setSortType(e.target.value);
		setToggleDropDown(false);
	};
	console.log(sortType);
	return (
		<>
			<Nav />
			<main className="container">
				<div className="nowPlaying">
					<div className="nowPlaying__topContent">
						<h1>Now Playing</h1>
						<div className="nowPlaying__buttonsWrapper nowPlaying__buttonsWrapper--open">
							<div className="nowPlaying__sortOptions">
								<span
									className={
										toggleDropDown
											? "nowPlaying__sortToggle--open"
											: "nowPlaying__sortToggle"
									}
									onClick={() => {
										setToggleDropDown(
											(prev) => (prev = !prev)
										);
									}}
								>
									{sortType.length > 0 ? sortType : "Sort By"}
								</span>
								{toggleDropDown ? (
									<DropdownSortMenu
										classDrop={"dropDownSort--open"}
										onChange={toggleChange}
									/>
								) : (
									<DropdownSortMenu
										classDrop={"dropDownSort"}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
