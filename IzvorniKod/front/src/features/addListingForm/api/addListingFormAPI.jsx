import axios from "axios";
axios.defaults.withCredentials = true;

export const addListingFormAPI = async (data) => {
	try {
		const response = await axios.post("/api/ads/save", data);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
