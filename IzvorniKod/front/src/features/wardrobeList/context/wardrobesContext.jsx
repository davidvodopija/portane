import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth.jsx";
import {
	getWeatherKey,
	getAllWardrobes,
	removeWardrobeByID,
} from "../api/wardrobesAPI.jsx";
import { getAllWardrobeItems } from "../../wardrobeView/api/wardrobeItemsAPI.jsx";

export const wardrobesContext = createContext();

export const WardrobesProvider = ({ children }) => {
	const [wardrobes, setWardrobes] = useState(null);
	const [wardrobesInfo, setWardrobesInfo] = useState(null);
	const { user, isLoggedIn } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState(0);
	const [weatherKey, setWeatherKey] = useState("");

	const getWardrobes = async () => {
		try {
			if (!user.seller) {
				const updatedWardrobes = await getAllWardrobes();
				setWardrobes(updatedWardrobes.content);
				setWardrobesInfo(updatedWardrobes);
				getWardrobeItems(updatedWardrobes.content);
			} else {
				setWardrobes([]);
				setWardrobesInfo([]);
			}
		} catch (error) {
			console.error("Error getting wardrobes:", error);
		}
	};

	const getWardrobeItems = async (wardrobes) => {
		try {
			if (!wardrobes) return;

			const allItems = await Promise.all(
				wardrobes.map((wardrobe) => getAllWardrobeItems(wardrobe.id))
			);

			const allWardrobeItems = allItems.flat();
			setItems(allWardrobeItems);
		} catch (error) {
			console.error("Error getting all wardrobe items:", error);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			getWardrobes().then(() => {
				getWeatherKey().then((key) => {
					setWeatherKey(key);
					setIsLoading(false);
				});
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
		wardrobesInfo,
		items,
		weatherKey,
		getWardrobes,
		deleteWardrobe,
	};

	return (
		<wardrobesContext.Provider value={value}>
			{children}
		</wardrobesContext.Provider>
	);
};
