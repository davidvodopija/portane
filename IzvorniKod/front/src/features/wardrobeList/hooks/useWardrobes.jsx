import {useContext} from "react";
import {wardrobesContext} from "../context/wardrobesContext.jsx";

export const useWardrobes = () => {
    return useContext(wardrobesContext);
};