import axios from "axios";
axios.defaults.withCredentials = true;

export const uploadImage = async (file) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.post("/api/storage/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
