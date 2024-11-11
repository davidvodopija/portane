import axios from "axios";
axios.defaults.withCredentials = true;

var host = "http://localhost:8080";

export const login = async (data) => {
	try {
		const response = await axios.post(host + "/api/auth/login", data);
		return response.data;
	} catch (error) {
		alert("Neuspjela prijava, pokušajte ponovno!");
		throw new Error("Login failed");
	}
};

export const register = async (data) => {
	try {
		const response = await axios.post(host + "/api/users/create", data);
		return response.data;
	} catch (error) {
		alert("Neuspjela registracija, pokušajte ponovno!");
		throw new Error("Registration failed");
	}
};
