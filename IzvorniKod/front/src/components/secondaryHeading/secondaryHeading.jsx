import "bootstrap/dist/css/bootstrap.css";
import "./secondaryHeading.css";

function SecondaryHeading({ text }) {
	return (
		<div className="secondary-heading-container ms-4 my-5">
			<div className="secondary-heading-text"> {text} </div>
			<hr className="secondary-heading-hr my-2" />
		</div>
	);
}

export default SecondaryHeading;
