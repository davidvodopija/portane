import "./wardrobeItem.css";

function WardrobeItem({ src, location, itemName }) {
	return (
		<div className="card wardrobe-item-card">
			<img src={src} className="card-img-top" alt={itemName} />
			<div className="card-body p-0 pb-2">
				<p className="card-location mb-1 ms-3">{location}</p>
				<p className="card-text ms-3">{itemName}</p>
			</div>
		</div>
	);
}

export default WardrobeItem;
