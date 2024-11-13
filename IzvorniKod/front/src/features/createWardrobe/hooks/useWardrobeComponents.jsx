import {useContext} from "react";
import {wardrobeComponentsContext} from "../context/createWardrobeContext.jsx";

export const useWardrobeComponents = () => {
    return useContext(wardrobeComponentsContext);
};