import React, {createContext, useState, useEffect} from "react";
import {createWardrobe, getFormCategories} from "../api/createWardrobeAPI.jsx";
import {useAuth} from "../../auth/hooks/useAuth.jsx";
import {useWardrobes} from "../../wardrobeList/hooks/useWardrobes.jsx";

export const wardrobeComponentsContext = createContext();

export const WardrobeComponentsProvider = ({children}) => {
    const [wardrobeComponents, setWardrobeComponents] = useState(null);
    const {isLoggedIn} = useAuth();
    const {getWardrobes} = useWardrobes();
    
    useEffect(() => {
        if (isLoggedIn) {
            getComponents();
        }
    }, [isLoggedIn]);

    const getComponents = async () => {
        try {
            const wardrobeComponents = await getFormCategories();
            setWardrobeComponents(wardrobeComponents);
        } catch (error) {
            throw new Error(error)
        }
    };

    const addWardrobe = async (data) => {
        try {
            const updatedWardrobes = await createWardrobe(data);
            getWardrobes();
        } catch (error) {
            console.error("Error adding wardrobe:", error);
        }
    };

    const value = {
        wardrobeComponents,
        getComponents,
        addWardrobe,
    };

    return <wardrobeComponentsContext.Provider value={value}>{children}</wardrobeComponentsContext.Provider>

};
