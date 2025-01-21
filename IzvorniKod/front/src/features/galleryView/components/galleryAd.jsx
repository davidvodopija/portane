import { useEffect, useState } from "react";
import "../../wardrobeView/components/wardrobeItem.css";
import { useNavigate } from "react-router-dom";
import { deleteAd, getAdById } from "../api/galleryAdsAPI";
import placeholder from "../../../assets/placeholderImg.png";
import HoverItemActions from "../../../components/hoverItemActions/hoverItemActions";

function GalleryAd({ id, galleryId, onItemDeleted }) {
	const navigate = useNavigate();
	const [ad, setAd] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAdById(id).then((response) => {
			setAd(response);
			setIsLoading(false);
		});
	}, []);

	const handleDeleteAd = async () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this ad?"
		);

		if (confirmDelete) {
			try {
				await deleteAd(id);
				onItemDeleted(id);
			} catch (error) {
				console.error("Couldnt delete ad ", error);
			}
		}
	};

	const handleEditAd = () => {
		navigate(`/galleries/${galleryId}/edit-ad/${id}`);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="card wardrobe-item-card">
			<img
				src={ad.article.picture || placeholder}
				className="card-img-top"
				alt={ad.article.label}
				onClick={() => navigate(`/galleries/${galleryId}/listing/${id}`)}
			/>

			<div className="card-body p-0 pb-2 ps-3 pe-1">
				<div className="actions-on-hover d-flex justify-content-end">
					{
						<HoverItemActions
							shared={true}
							onShare={null}
							onEdit={handleEditAd}
							onDelete={handleDeleteAd}
						/>
					}
				</div>
				<p className="card-location mb-0">{ad.price}€</p>
				<a
					className="card-text"
					onClick={() => navigate(`/galleries/${galleryId}/listing/${id}`)}>
					{ad.article.label}
				</a>
			</div>
		</div>
	);
}

export default GalleryAd;
