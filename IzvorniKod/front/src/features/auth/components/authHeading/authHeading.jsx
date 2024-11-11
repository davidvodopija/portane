import "./authHeading.css";
import { useNavigate } from "react-router-dom";

function AuthHeading({ text }) {
	const navigate = useNavigate();

	return (
		<>
			<div className="h-auth" onClick={() => navigate("/")}>
				{text}
			</div>
			<hr className="hr-auth" />
		</>
	);
}

export default AuthHeading;
