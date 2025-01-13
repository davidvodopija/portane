import React, { createContext, useState, useEffect } from "react";
import { getCodebook } from "../api/codebooksAPI";

export const CodebooksContext = createContext();

export const CodebooksProvider = ({ children }) => {
	const [codebooks, setCodebooks] = useState([]);
	let codebookNames = [
		"styles",
		"seasons",
		"footwear-types",
		"conditions",
		"colors",
		"categories",
	];
	useEffect(() => {
		const fetchCodebooks = async () => {
			const codebooksData = {};
			for (const name of codebookNames) {
				const response = await getCodebook(name);
				codebooksData[name] = response.result;
			}
			setCodebooks(codebooksData);
		};

		fetchCodebooks();
	}, []);

	return (
		<CodebooksContext.Provider value={{ codebooks }}>
			{children}
		</CodebooksContext.Provider>
	);
};
