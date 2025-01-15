import React, { useContext, useEffect } from "react";
import {
	AuthContext,
	AuthProvider,
} from "../features/auth/context/authProvider";
import { WardrobesProvider } from "../features/wardrobeList/context/wardrobesContext.jsx";
import { CodebooksProvider } from "../features/codebooks/context/codebooksContext.jsx";

function AppProvider({ children }) {
	return (
		<AuthProvider>
			<UserProviders>{children}</UserProviders>
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

	return (
		<CodebooksProvider>
			<WardrobesProvider>{children}</WardrobesProvider>
		</CodebooksProvider>
	);
}

export default AppProvider;
