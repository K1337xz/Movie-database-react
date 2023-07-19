import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorpage/errorpage.jsx";
import ClickedMovie from "./pages/clickedMoviepage/ClickedMovie.jsx";
import ClickedSeries from "./pages/clickedSeries/ClickedSeries.jsx";
import "./index.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/m/:id",
		element: <ClickedMovie />,
	},
	{
		path: "/s/:id",
		element: <ClickedSeries />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
