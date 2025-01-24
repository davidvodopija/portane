import React, {createContext, useState, useEffect} from "react";
import ContactInfo from "../../itemInfo/components/contactInfo.jsx";
//import { useAuth } from "../../auth/hooks/useAuth.jsx";
//import { getAllWardrobes, removeWardrobeByID } from "../api/wardrobesAPI.jsx";

export const searchContext = createContext();

export const SearchProvider = ({children}) => {
    //const [wardrobes, setWardrobes] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // null or empty string
    const [searchMode, setSearchMode] = useState("sharedItems");
    const [entered, setEntered] = useState(1);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [formData, setFormData] = useState({
        label: null, // in search box
        categoryIds: null,
        conditionIds: null,
        styleIds: null,
        primaryColorIds: null,
        secondaryColorIds: null,
        seasonIds: null,
        footwearTypeIds: null,
        userId: null,
        closetId: null,
        closetComponentIds: null,
        public: null,
    });

    useEffect(() => {
        setPage(0);
    }, [totalPages]);

    const value = {
        searchTerm,
        setSearchTerm,
        searchMode,
        setSearchMode,
        entered,
        setEntered,
        page,
        setPage,
        totalPages,
        setTotalPages,
        formData,
        setFormData,
    };

    return (
        <searchContext.Provider value={value}>
            {children}
        </searchContext.Provider>
    );
};
