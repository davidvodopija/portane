import {postAdvertSearch, postSearch} from "../api/categorySelectAPI.jsx";


export const handleSubmitArticle = async (formData, mode, setItemList, currentPage, size, setTotalPages) => {
    try {
        if (mode !== "myItems") {
            formData.userId = null;
        }
        console.log(formData);

        const response = await postSearch(formData, currentPage, size);
        if (response) {
            console.log(response);
            setItemList(response.result.content);
            setTotalPages(response.result.totalPages)
        }

    } catch (error) {
        console.error("Error while submitting the form:", error);
    }
};

export const handleSubmitAdverts = async (formData, mode, setItemList, currentPage, size, setTotalPages) => {
    try {
        console.log(formData);

        const response = await postAdvertSearch(formData, currentPage, size);
        if (response) {
            console.log(response);
            setItemList(response.result.content);
            setTotalPages(response.result.totalPages)
        }

    } catch (error) {
        console.error("Error while submitting the form:", error);
    }
};