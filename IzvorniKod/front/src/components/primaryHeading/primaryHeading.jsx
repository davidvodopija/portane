import "bootstrap/dist/css/bootstrap.css";
import "./primaryHeading.css";

function PrimaryHeading({ text }) {
	return (
		<div className="primary-heading-container mx-5">
			<div className="primary-heading-text text-center"> {text} </div>
			<hr className="primary-heading-hr my-2 mx-5" />
		</div>
	);
}

export default PrimaryHeading;
