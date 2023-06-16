import "./Sceleton.scss";
import { Link, generatePath, useOutlet } from "react-router-dom";
export default function Sceleton() {
	return (
		<div className="sceleton">
			<p className="sceleton__span"></p>
			<h1 className="sceleton__header"></h1>
			<p className="sceleton__overview"></p>
			<Link className="sceleton__button"></Link>
		</div>
	);
}
