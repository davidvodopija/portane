import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth.jsx";
import { getAllWardrobes, removeWardrobeByID } from "../api/wardrobesAPI.jsx";

export const wardrobesContext = createContext();

export const WardrobesProvider = ({ children }) => {
	const [wardrobes, setWardrobes] = useState(null);
	const { isLoggedIn } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	const getWardrobes = async () => {
		try {
			const updatedWardrobes = await getAllWardrobes();
			setWardrobes(updatedWardrobes);
		} catch (error) {
			console.error("Error getting wardrobes:", error);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			getWardrobes().then(() => {
				setIsLoading(false);
			});
		}
	}, [isLoggedIn]);

	if (isLoading) {
		return "Loading...";
	}

	const deleteWardrobe = async (ID) => {
		try {
			const updatedWardrobes = await removeWardrobeByID(ID);
			getWardrobes();
		} catch (error) {
			console.error("Error deleting wardrobe:", error);
		}
	};

	const value = {
		wardrobes,
		getWardrobes,
		deleteWardrobe,
	};

	return (
		<wardrobesContext.Provider value={value}>
			{children}
		</wardrobesContext.Provider>
	);
};
