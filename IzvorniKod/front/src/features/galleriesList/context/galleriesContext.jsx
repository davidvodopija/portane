import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth.jsx";
import { getAllGalleries, removeGalleryByID } from "../api/galleriesAPI.jsx";

export const galleriesContext = createContext();

export const GalleriesProvider = ({ children }) => {
	const [galleries, setGalleries] = useState(null);
	const { user, isLoggedIn } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	const getGalleries = async () => {
		try {
			const updatedGalleries = await getAllGalleries(user.seller.id);
			setGalleries(updatedGalleries);
		} catch (error) {
			console.error("Error getting galleries: ", error);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			getGalleries().then(() => {
				setIsLoading(false);
			});
		}
	}, [isLoggedIn]);

	if (isLoading) {
		return "Loading...";
	}

	const getNoOfAds = () => {
		return galleries.reduce((acc, gallery) => {
			return acc + gallery.adsCount;
		}, 0);
	};

	const deleteGallery = async (id) => {
		if (id == -1) {
			getGalleries();
		} else {
			try {
				const updatedGalleries = await removeGalleryByID(id);
				getGalleries();
			} catch (error) {
				console.error("Error deleting gallery: ", error);
			}
		}
	};

	const value = {
		galleries,
		getGalleries,
		setGalleries,
		getNoOfAds,
		deleteGallery,
	};

	return (
		<galleriesContext.Provider value={value}>
			{children}
		</galleriesContext.Provider>
	);
};
