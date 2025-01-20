import { useEffect, useState } from "react";
import "../../wardrobeView/components/wardrobeItemsList.css";
import GalleryAd from "./galleryAd";
import placeholder from "../../../assets/placeholderImg.png";
import { useParams } from "react-router-dom";
import { getAllGalleryItems } from "../api/galleryAdsAPI";

function GalleryAdsList() {
	const [ads, setAds] = useState([]);
	const { galleryId } = useParams();
	useEffect(() => {
		getAllGalleryItems(galleryId)
			.then((data) => setAds(data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="wardrobe-items-container d-flex flex-wrap mx-5 mt-3 mb-5">
			{ads.map((ad) => (
				<GalleryAd
					key={ad.id}
					id={ad.article.id}
					src={ad.article.picture || placeholder}
					listingName={ad.article.label}
					galleryId={galleryId}
					price={ad.price}
				/>
			))}
		</div>
	);
}

export default GalleryAdsList;
