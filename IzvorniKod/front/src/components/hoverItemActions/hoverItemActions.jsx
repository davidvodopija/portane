import "bootstrap/dist/css/bootstrap.css";
import "./hoverItemActions.css";

function HoverItemActions({ shared, onShare, onEdit, onDelete }) {
	return (
		<div className="hover-buttons gap-1 d-flex flex-wrap me-2 pe-1">
			{onShare && (
				<button className="btn btn-pink btn-sm" title="Share" onClick={onShare}>
					{shared ? (
						<i className="bi bi-bookmark-dash-fill"></i>
					) : (
						<i className="bi bi-bookmark-plus"></i>
					)}
				</button>
			)}
			<button className="btn btn-sm" title="Edit" onClick={onEdit}>
				<i className="bi bi-pencil-square"></i>
			</button>
			<button
				className="btn text-danger btn-sm"
				title="Delete"
				onClick={onDelete}>
				<i className="bi bi-trash-fill"></i>
			</button>
		</div>
	);
}

export default HoverItemActions;
