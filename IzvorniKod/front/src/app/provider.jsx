import React, { createContext, useState } from "react";
import { AuthProvider } from "../features/auth/context/authProvider";

function AppProvider({ children }) {
	return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
