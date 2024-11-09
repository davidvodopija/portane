import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../../globalStyles.css";
import { useParams } from "react-router-dom";

const { mode } = useParams();
function Auth() {
	return (
		<>
			<div className="d-flex flex-column align-items-center">
				<div className="h-auth">PORTANE</div>
				<hr className="hr-auth" />
			</div>
		</>
	);
}

export default Auth;
