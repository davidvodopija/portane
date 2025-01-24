import axios from "axios";

axios.defaults.withCredentials = true;

export const createWardrobe = async (data) => {
	try {
		const response = await axios.post("/api/closets/create", data);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
