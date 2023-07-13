import "./empty.scss";

export default function Empty(props) {
	return (
		<div className="emptyImage">
			<div className="emptyImage__container">
				<h1>{props.msg}</h1>
			</div>
		</div>
	);
}
