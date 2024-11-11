import React, { createContext, useState, useEffect } from "react";
import { login, register } from "../api/authAPI";
import { useNavigate } from "react-router-dom";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	// Fetch user data from local storage on initial render to restore session
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("authUser"));
		if (storedUser) {
			setUser(storedUser);
			setIsLoggedIn(true);
		}
	}, []);

	// Save user to local storage when user state changes
	useEffect(() => {
		if (user) {
			localStorage.setItem("authUser", JSON.stringify(user));
		} else {
			localStorage.removeItem("authUser");
		}
	}, [user]);

	const registerUser = async (user) => {
		try {
			const tmpUser = await register(user);
			setUser(tmpUser);
			setIsLoggedIn(true);
		} catch (error) {
			setUser(null);
			setIsLoggedIn(false);
		}
	};

	const loginUser = async (user) => {
		try {
			const tmpUser = await login(user);
			setUser(tmpUser);
			setIsLoggedIn(true);
			navigate("/user-profile");
		} catch (error) {
			setUser(null);
			setIsLoggedIn(false);
		}
	};

	const value = {
		user,
		isLoggedIn,
		registerUser,
		loginUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};