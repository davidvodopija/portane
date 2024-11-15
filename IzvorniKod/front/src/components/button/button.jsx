import "bootstrap/dist/css/bootstrap.css";
import "./button.css";

function Button({size, color, radius, children, onClick}) {
    return (
        <button
            className={`btn-${size} btn-${color} btn-${radius} btn`}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
}

export default Button;
