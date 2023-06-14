import { useState } from "react";
import "./Searchbar.scss";

export default function Searchbar() {
	const [value, setValue] = useState("");

	return (
		<div className="searchWrapper">
			<input
				type="text"
				placeholder="Search for a movie etc..."
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}
