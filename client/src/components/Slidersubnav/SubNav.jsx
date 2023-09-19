import { Link } from "react-router-dom";
import "./Subnav.scss";
export default function SubNav(props, ref) {
	return (
		<>
			<div className="subnav">
				<ul className="subnav__menu">
					<li className="subnav__item active">
						<span onClick={props.clicked}>1</span>
					</li>
					<li className="subnav__item">
						<span onClick={props.clicked}>2</span>
					</li>
					<li className="subnav__item">
						<span onClick={props.clicked}>3</span>
					</li>
					<li className="subnav__item">
						<span onClick={props.clicked}>4</span>
					</li>
				</ul>
			</div>
		</>
	);
}
