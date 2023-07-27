import { useState } from "react";
import "./Searchbar.scss";

export default function Searchbar({ onChange }) {
	const [value, setValue] = useState("");
	const callBack = (e) => {
		setValue(e.target.value);
		onChange(value);
	};

	return (
		<div className="searchWrapper">
			<input
				type="text"
				placeholder="Search for a movie etc..."
				value={value}
				onChange={callBack}
			/>
		</div>
	);
}
