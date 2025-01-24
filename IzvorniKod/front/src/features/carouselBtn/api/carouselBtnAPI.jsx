import axios from "axios";

axios.defaults.withCredentials = true;

export const getClosetNearYou = async() => {
    try {
		const response = await axios.get(`/api/articles/find-closest`);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};