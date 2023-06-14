import { useState } from "react";
import "./togglebtn.scss";

export const Toggle = ({ label, toggled, onClick }) => {
	const [isToggled, toggle] = useState(toggled);

	const callback = () => {
		toggle(!isToggled);
		onClick(!isToggled);
	};

	return (
		<label htmlFor="checkMonthly" className="customCheckbox">
			<input
				type="checkbox"
				defaultChecked={isToggled}
				onClick={callback}
				id="checkMonthly"
			/>
			<span className="checkSpan" />
		</label>
	);
};
