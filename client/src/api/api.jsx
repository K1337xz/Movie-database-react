import axios from "axios";

let date = new Date().toISOString().split("T")[0];
const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/movie",
});

export const getUpcoming = async () => {
	try {
		const response = await api.get("/upcoming", {
			params: {
				api_key: import.meta.env.VITE_API_KEY,
				"primary_release_date.gte": date,
			},
		});
		return response.data.results;
	} catch (error) {
		throw Error(error.message);
	}
};

export const nowPlaying = async () => {
	try {
		const response = await api.get("/now_playing", {
			params: { api_key: import.meta.env.VITE_API_KEY, year: 2023 },
		});
		return response.data.results;
	} catch (error) {
		throw Error(error.message);
	}
};

export const popular = async () => {
	try {
		const response = await api.get("/popular", {
			params: {
				api_key: import.meta.env.VITE_API_KEY,
				sort_by: "popularity.desc",
				"vote_count.gte": 500,
				"vote_average.gte": 7,
			},
		});
		return response.data.results;
	} catch (error) {
		throw Error(error.message);
	}
};

export const topRated = async () => {
	try {
		const response = await api.get("/top_rated", {
			params: {
				api_key: import.meta.env.VITE_API_KEY,
				sort_by: "vote_average.desc",
			},
		});
		return response.data.results;
	} catch (error) {
		throw Error(error.message);
	}
};

export const myApi = axios.create({
	baseURL: "https://moviedb-api.up.railway.app/api/v1",
	withCredentials: true,
});
