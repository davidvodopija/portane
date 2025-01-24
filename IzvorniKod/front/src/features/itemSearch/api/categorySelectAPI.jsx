import axios from "axios";
import paging from "../../../components/paging/paging.jsx";

axios.defaults.withCredentials = true;

export const postSearch = async (searchFilters, currentPage, size) => {
    try {
        const response = await axios.post(`/api/articles/search?page=${currentPage}&size=${size}`, searchFilters);
        return response.data;
    } catch (error) {
        alert(error.response.data.errors[0]);
        throw new Error(error);
    }
};

export const postAdvertSearch = async (searchFilters, currentPage, size) => {
    try {
        const response = await axios.post(`/api/ads/search?page=${currentPage}&size=${size}`, searchFilters);
        return response.data;
    } catch (error) {
        alert(error.response.data.errors[0]);
        throw new Error(error);
    }
};