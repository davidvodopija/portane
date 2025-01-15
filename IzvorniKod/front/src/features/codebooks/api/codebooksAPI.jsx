import axios from "axios";
axios.defaults.withCredentials = true;

export const getCodebook = async (codebookName) => {
	try {
		const response = await axios.get("/api/lut/" + codebookName + "/all");
		return response.data;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
