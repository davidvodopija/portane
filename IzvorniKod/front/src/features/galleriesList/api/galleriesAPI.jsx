import axios from "axios";

axios.defaults.withCredentials = true;

export const getAllGalleries = async (id) => {
	try {
		const response = await axios.get(`/api/galleries/get-by-seller/${id}`);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const removeGalleryByID = async (id) => {
	try {
		const response = await axios.delete(`/api/galleries/delete/${id}`);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const createGallery = async (data) => {
	try {
		const response = await axios.post("/api/galleries/save", data);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
