import "./dropdownsortmenu.scss";

export default function DropdownSortMenu(props) {
	return (
		<form className={props.classDrop} onChange={props.onChange}>
			<input
				type="radio"
				name="option"
				id="popularityDescending"
				value="Popularity Descending"
			/>
			<label
				htmlFor="popularityDescending"
				className="dropDownSort__option"
			>
				Popularity Descending
			</label>
			<input
				type="radio"
				name="option"
				id="popularityAscending"
				value="Popularity Ascending"
			/>
			<label
				htmlFor="popularityAscending"
				className="dropDownSort__option"
			>
				Popularity Ascending
			</label>
			<input
				type="radio"
				name="option"
				id="ratingDescending"
				value="Rating Descending"
			/>
			<label htmlFor="ratingDescending" className="dropDownSort__option">
				Rating Descending
			</label>
			<input
				type="radio"
				name="option"
				id="ratingAscending"
				value="Rating Ascending"
			/>
			<label htmlFor="ratingAscending" className="dropDownSort__option">
				Rating Ascending
			</label>
			<input
				type="radio"
				name="option"
				id="relaseDateDescending"
				value="Relase Date Descending"
			/>
			<label
				htmlFor="relaseDateDescending"
				className="dropDownSort__option"
			>
				Relase Date Descending
			</label>
			<input
				type="radio"
				name="option"
				id="relaseDateAescending"
				value="Relase Date Aescending"
			/>
			<label
				htmlFor="relaseDateAescending"
				className="dropDownSort__option"
			>
				Relase Date Aescending
			</label>
			<input type="radio" name="option" id="titleAZ" value="Title A-Z" />
			<label htmlFor="titleAZ" className="dropDownSort__option">
				Title (A-Z)
			</label>
		</form>
	);
}
