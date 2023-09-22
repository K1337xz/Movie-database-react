import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorpage/errorpage.jsx";
import ClickedMovie from "./pages/clickedMoviepage/ClickedMovie.jsx";
import ClickedSeries from "./pages/clickedSeries/ClickedSeries.jsx";
import NowPlaying from "./pages/nowPlaying/NowPlaying.jsx";
import Upcomingpage from "./pages/upcomingpage/Upcomingpage.jsx";
import TopRatedPage from "./pages/topRatedPage/TopRatedPage.jsx";
import PopularPage from "./pages/popularPage/PopularPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import { AuthContextProvider, AuthContext } from "./context/authContext";
import SignupPage from "./pages/signupPage/SignupPage.jsx";
import "./index.scss";
const { currentUser } = useContext(AuthContext);
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
		element: <Upcomingpage />,
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
		element: <SignupPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/:username",
		element: <div>HELLO {currentUser.username}</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</React.StrictMode>
);
