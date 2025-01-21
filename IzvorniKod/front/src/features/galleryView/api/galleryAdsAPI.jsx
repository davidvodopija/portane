import axios from "axios";
axios.defaults.withCredentials = true;

export const getAllGalleryItems = async (id) => {
	try {
		const response = await axios.get(`/api/ads/get-in-gallery/${id}`);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const getAdById = async (id) => {
	try {
		const response = await axios.get(`/api/ads/get/${id}`);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const deleteAd = async (id) => {
	try {
		await axios.delete(`/api/ads/delete/${id}`);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
