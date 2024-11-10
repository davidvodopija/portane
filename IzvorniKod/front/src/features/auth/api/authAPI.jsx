import axios from "axios";
axios.defaults.withCredentials = true;

var host = "http://localhost:8080";

export const login = async (data) => {
	try {
		const response = await axios.post(host + "/api/auth/login", data);
	} catch (error) {
		throw error.response ? error.response.data : new Error("Network error");
	}
};

export const register = async (data) => {
	try {
		const response = await axios.post(host + "/api/users/create", data);
	} catch (error) {
		throw error.response ? error.response.data : new Error("Network error");
	}
};
export const test = async () => {
	try {
		const response = await axios.get(host + "/api/users/test");
	} catch (error) {
		throw error.response ? error.response.data : new Error("Network error");
	}
};
