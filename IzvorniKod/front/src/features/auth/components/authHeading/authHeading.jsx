import "./authHeading.css";

function AuthHeading({ text }) {
	return (
		<>
			<div className="h-auth">{text}</div>
			<hr className="hr-auth" />
		</>
	);
}

export default AuthHeading;
