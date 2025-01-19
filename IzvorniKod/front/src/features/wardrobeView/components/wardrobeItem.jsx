import "./wardrobeItem.css";
import HoverItemActions from "./hoverItemActions";
import { useNavigate } from "react-router-dom";

function WardrobeItem({
	id,
	src,
	location,
	itemName,
	onItemDeleted,
	wardrobeId,
}) {
	const navigate = useNavigate();
	return (
		<div className="card wardrobe-item-card">
			<img
				src={src}
				className="card-img-top"
				alt={itemName}
				onClick={() =>
					navigate(`/wardrobes/${wardrobeId}/item-details/${id}`)
				}
			/>

			<div className="card-body p-0 pb-2">
				<div className="actions-on-hover d-flex justify-content-end">
					<HoverItemActions
						id={id}
						onItemDeleted={onItemDeleted}
						wardrobeId={wardrobeId}
					/>
				</div>
				<p className="card-location ms-3 mb-0">{location}</p>
				<a
					className="card-text ms-3"
					onClick={() =>
						navigate(`/wardrobes/${wardrobeId}/item-details/${id}`)
					}
				>
					{itemName}{" "}
				</a>
			</div>
		</div>
	);
}

export default WardrobeItem;
