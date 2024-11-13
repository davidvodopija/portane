import React, {createContext, useState, useEffect} from "react";
import {useAuth} from "../../auth/hooks/useAuth.jsx";
import {getAllWardrobes} from "../api/wardrobesAPI.jsx";

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
            console.error("Error adding wardrobe:", error);
        }
    };


    const value = {
        wardrobes,
        getWardrobes,
    };

    return <wardrobesContext.Provider value={value}>{children}</wardrobesContext.Provider>
};