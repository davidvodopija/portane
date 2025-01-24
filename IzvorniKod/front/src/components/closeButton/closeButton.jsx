import "bootstrap/dist/css/bootstrap.css";

function CloseButton({onClick}) {
    return (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClick}></button>
    );
}

export default CloseButton;
