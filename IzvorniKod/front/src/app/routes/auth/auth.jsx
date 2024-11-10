import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../../globalStyles.css";
import { useParams } from "react-router-dom";
import AuthSelector from "../../../features/auth/components/authSelector/authSelector";
import AuthHeading from "../../../features/auth/components/authHeading/authHeading";

function Auth() {
	const { mode } = useParams();
	return (
		<div className="d-flex flex-column align-items-center center-screen">
			<AuthHeading text={"Portane"}></AuthHeading>
			<AuthSelector mode={mode}></AuthSelector>
		</div>
	);
}

export default Auth;
