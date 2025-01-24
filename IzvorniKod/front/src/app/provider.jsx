import React, {useContext} from "react";
import {
    AuthContext,
    AuthProvider,
} from "../features/auth/context/authProvider";
import {WardrobesProvider} from "../features/wardrobeList/context/wardrobesContext.jsx";
import {CodebooksProvider} from "../features/codebooks/context/codebooksContext.jsx";
import {GalleriesProvider} from "../features/galleriesList/context/galleriesContext.jsx";
import {SearchProvider} from "../features/itemSearch/contex/searchContex.jsx";

function AppProvider({children}) {
    return (
        <AuthProvider>
            <CodebooksProvider>
                <SearchProvider>
                    <UserProviders>{children}</UserProviders>
                </SearchProvider>
            </CodebooksProvider>
        </AuthProvider>
    );
}

function UserProviders({children}) {
    const {user, isLoggedIn, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isLoggedIn) {
        return <CodebooksProvider>{children}</CodebooksProvider>;
    }

    return (
        <GalleriesProvider>
            <WardrobesProvider>{children} </WardrobesProvider>
        </GalleriesProvider>
    );
}

export default AppProvider;
