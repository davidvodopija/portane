import axios from "axios";
axios.defaults.withCredentials = true;

export const getAllWardrobeParts = async (id) => {
	try {
		const response = await axios.get(
			`/api/closet-custom-components/find-for-closet/${id}`
		);
		return response.data.result;
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const renameWardrobePart = async (id, newName) => {
	try {
		const response = await axios.put(
			`/api/closet-custom-components/save/${id}`,
			{ title: newName, componentId: id }
		);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const removeWardrobePart = async (id) => {
	try {
		const response = await axios.delete(
			`/api/closet-custom-components/delete/${id}`
		);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};

export const createWardrobePart = async (id, data) => {
	try {
		const response = await axios.post(
			"/api/closet-custom-components/add/" + id,
			{ title: data.title, componentId: data.id }
		);
	} catch (error) {
		alert(error.response.data.errors[0]);
		throw new Error(error);
	}
};
