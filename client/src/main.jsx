import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorpage/errorpage.jsx";
import ClickedMovie from "./pages/clickedMoviepage/ClickedMovie.jsx";
import ClickedSeries from "./pages/clickedSeries/ClickedSeries.jsx";
import NowPlaying from "./pages/nowPlaying/nowPlaying.jsx";
import UpcomingPage from "./pages/upcomingPage/UpcomingPage.jsx";
import TopRatedPage from "./pages/topRatedPage/TopRatedPage.jsx";
import PopularPage from "./pages/popularPage/PopularPage.jsx";
import "./index.scss";
import Loginpage from "./pages/loginPage/Loginpage.jsx";

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
		path: "m/now_playing",
		element: <NowPlaying />,
	},
	{
		path: "m/upcoming",
		element: <UpcomingPage />,
	},
	{
		path: "m/top_rated",
		element: <TopRatedPage />,
	},
	{
		path: "m/popular",
		element: <PopularPage />,
	},
	{
		path: "/s/:id",
		element: <ClickedSeries />,
	},
	{
		path: "/signup",
		element: <Loginpage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
