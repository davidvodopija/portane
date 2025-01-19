import React, { useContext } from "react";
import {
	AuthContext,
	AuthProvider,
} from "../features/auth/context/authProvider";
import { WardrobesProvider } from "../features/wardrobeList/context/wardrobesContext.jsx";
import { CodebooksProvider } from "../features/codebooks/context/codebooksContext.jsx";
import { GalleriesProvider } from "../features/galleriesList/context/galleriesContext.jsx";

function AppProvider({ children }) {
	return (
		<AuthProvider>
			<CodebooksProvider>
				<UserProviders>{children}</UserProviders>
			</CodebooksProvider>
		</AuthProvider>
	);
}

function UserProviders({ children }) {
	const { user, isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isLoggedIn) {
		return children;
	}

	return user.seller ? (
		<GalleriesProvider>{children}</GalleriesProvider>
	) : (
		<WardrobesProvider>{children}</WardrobesProvider>
	);
}

export default AppProvider;
