import React, {createContext, useState, useEffect} from "react";
import {useAuth} from "../../auth/hooks/useAuth.jsx";
import {getAllWardrobes, removeWardrobeByID} from "../api/wardrobesAPI.jsx";

export const wardrobesContext = createContext();

export const WardrobesProvider = ({children}) => {
    const [wardrobes, setWardrobes] = useState(null);
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            getWardrobes();
        } else {
            setWardrobes(null)
        }
    }, [isLoggedIn]);

    const getWardrobes = async () => {
        try {
            const updatedWardrobes = await getAllWardrobes();
            setWardrobes(updatedWardrobes);
        } catch (error) {
            console.error("Error getting wardrobes:", error);
        }
    };

    const deleteWardrobe = async (ID) => {
        try {
            const updatedWardrobes = await removeWardrobeByID(ID);
            getWardrobes();
        } catch (error) {
            console.error("Error deleting wardrobe:", error);
        }
    };


    const value = {
        wardrobes,
        getWardrobes,
        deleteWardrobe
    };

    return <wardrobesContext.Provider value={value}>{children}</wardrobesContext.Provider>
};