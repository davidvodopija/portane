import "./wardrobeItem.css";
import HoverItemActions from "./hoverItemActions";

function WardrobeItem({
	id,
	src,
	location,
	itemName,
	onItemDeleted,
	wardrobeId,
}) {
	return (
		<div className="card wardrobe-item-card">
			<img src={src} className="card-img-top" alt={itemName} />

			<div className="card-body p-0 pb-2">
				<div className="actions-on-hover d-flex justify-content-end">
					<HoverItemActions
						id={id}
						onItemDeleted={onItemDeleted}
						wardrobeId={wardrobeId}
					/>
				</div>
				<p className="card-location ms-3 mb-0">{location}</p>
				<p className="card-text ms-3">{itemName}</p>
			</div>
		</div>
	);
}

export default WardrobeItem;
