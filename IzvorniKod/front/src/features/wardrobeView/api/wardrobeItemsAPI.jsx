import axios from "axios";
axios.defaults.withCredentials = true;

export const getAllWardrobeItems = async (id) => {
	try {
		const response = await axios.get(`/api/articles/search-in-closet/${id}`);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
