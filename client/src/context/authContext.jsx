import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

	const login = async (inputs) => {
		const res = await axios.post(
			"https://moviedb-api-gi64.onrender.com/api/v1/auth/login",
			inputs,
			{
				withCredentials: true,
			}
		);

		setCurrentUser(res.data);
	};

	const logout = async () => {
		try {
			const res = await axios.post(
				"https://moviedb-api-gi64.onrender.com/api/v1/auth/logout"
			);
			setCurrentUser(null);
			console.log(res);
			console.log("pozdrawiam wszystkich!");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
