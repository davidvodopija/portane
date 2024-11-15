import React, {createContext, useState} from "react";
import {AuthProvider} from "../features/auth/context/authProvider";
import {WardrobeComponentsProvider} from "../features/createWardrobe/context/createWardrobeContext.jsx";
import {WardrobesProvider} from "../features/wardrobeList/context/wardrobesContext.jsx";

function AppProvider({children}) {
    return <AuthProvider>
        <WardrobesProvider>
            <WardrobeComponentsProvider>
                {children}
            </WardrobeComponentsProvider>
        </WardrobesProvider>
    </AuthProvider>;
}

export default AppProvider;
