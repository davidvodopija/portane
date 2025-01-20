import "../../wardrobeView/components/wardrobeItem.css";
import { useNavigate } from "react-router-dom";

function GalleryAd({ id, src, listingName, galleryId, price }) {
	const navigate = useNavigate();

	return (
		<div className="card wardrobe-item-card">
			<img
				src={src}
				className="card-img-top"
				alt={listingName}
				onClick={() =>
					navigate(`/galleries/${galleryId}/listing/${id}`)
				}
			/>

			<div className="card-body p-0 pb-2">
				<div className="actions-on-hover d-flex justify-content-end">
					{/* <HoverItemActions
						id={id}
						onItemDeleted={onItemDeleted}
						galleryId={galleryId}
					/> */}
				</div>
				<p className="card-location ms-3 mb-0">{price}€</p>
				<a
					className="card-text ms-3"
					onClick={() =>
						navigate(`/galleries/${galleryId}/listing/${id}`)
					}
				>
					{listingName}{" "}
				</a>
			</div>
		</div>
	);
}

export default GalleryAd;
