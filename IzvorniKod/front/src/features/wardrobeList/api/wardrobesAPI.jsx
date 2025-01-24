import axios from "axios";

axios.defaults.withCredentials = true;

export const getAllWardrobes = async () => {
	try {
		const response = await axios.get("/api/closets/my-closets");
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const removeWardrobeByID = async (ID) => {
	try {
		const response = await axios.delete(`/api/closets/delete/${ID}`);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const getWeatherKey = async () => {
	try {
		const response = await axios.get("/api/weather/api-key");
		return response.data;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
