import axios from "axios";
axios.defaults.withCredentials = true;

export const addItemFormAPI = async (data) => {
	try {
		const response = await axios.post("/api/articles/save", data);
		return response.data;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
