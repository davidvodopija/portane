import React from "react";
import Router from "./router";
import AppProvider from "./provider";

function App() {
	return (
		<AppProvider>
			<Router />
		</AppProvider>
	);
}

export default App;
