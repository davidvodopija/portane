import axios from "axios";
axios.defaults.withCredentials = true;

export const generateOutfit = async (data) => {
	try {
		const response = await axios.post(
			"/api/articles/generate-outfit",
			data
		);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
