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
