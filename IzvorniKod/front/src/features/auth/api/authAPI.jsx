import axios from "axios";
axios.defaults.withCredentials = true;

export const login = async (data) => {
	try {
		const response = await axios.post("/api/auth/login", data);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const register = async (data) => {
	try {
		const response = await axios.post("/api/users/create", data);

		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const logout = async () => {
	try {
		const response = await axios.get("/api/auth/logout");
	} catch {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
