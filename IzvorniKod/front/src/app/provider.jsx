import React, { createContext, useState } from "react";
import { AuthProvider } from "../features/auth/context/authProvider";
import { WardrobeComponentsProvider } from "../features/createWardrobe/context/createWardrobeContext.jsx";
import { WardrobesProvider } from "../features/wardrobeList/context/wardrobesContext.jsx";
import { CodebooksProvider } from "../features/codebooks/context/codebooksContext.jsx";

function AppProvider({ children }) {
	return (
		<AuthProvider>
			<CodebooksProvider>
				<WardrobesProvider>
					<WardrobeComponentsProvider>{children}</WardrobeComponentsProvider>
				</WardrobesProvider>
			</CodebooksProvider>
		</AuthProvider>
	);
}

export default AppProvider;
