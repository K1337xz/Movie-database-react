import { useRouteError } from "react-router-dom";
import Nav from "../components/Navbar/Nav";

export default function ErrorPage() {
	const error = useRouteError();
	console.log(error);

	return (
		<>
			<Nav />
			<div className="errorContent">
				<h1>Oops</h1>
				<p>
					Sorry but the page you are looking for does not exist, have
					been removed,name changed or is temporarily unavailable
				</p>
				<p>{error.statusText || error.message}</p>
			</div>
		</>
	);
}
