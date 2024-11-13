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