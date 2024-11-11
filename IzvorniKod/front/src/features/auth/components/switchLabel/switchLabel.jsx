import "./switchLabel.css";

// Essentially a button, made into a separate component because of drastically different styling and functionality in comparison with other buttons in the app
function SwitchLabel({ isActive, children, onClick }) {
	return isActive ? (
		<p className="switchlabel switchlabel-active" onClick={onClick}>
			{children}
		</p>
	) : (
		<p className="switchlabel switchlabel-passive" onClick={onClick}>
			{children}
		</p>
	);
}

export default SwitchLabel;
