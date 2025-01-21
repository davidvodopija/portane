import { useEffect, useState, useContext } from "react";
import "../../wardrobeView/components/wardrobeItemsList.css";
import GalleryAd from "./galleryAd";
import { useParams } from "react-router-dom";
import { getAllGalleryItems } from "../api/galleryAdsAPI";
import { galleriesContext } from "../../galleriesList/context/galleriesContext";

function GalleryAdsList() {
	const [ads, setAds] = useState([]);
	const { galleryId } = useParams();
	const { getGalleries } = useContext(galleriesContext);
	useEffect(() => {
		getAllGalleryItems(galleryId)
			.then((data) => setAds(data))
			.catch((error) => console.error(error));
	}, []);

	const handleAdDelete = (deletedAdId) => {
		getAllGalleryItems(galleryId)
			.then((data) => setAds(data))
			.catch((error) => console.error(error));
		getGalleries();
	};

	return (
		<div className="wardrobe-items-container d-flex flex-wrap mx-5 mt-3 mb-5">
			{ads.map((ad) => (
				<GalleryAd
					key={ad.id}
					id={ad.id}
					galleryId={galleryId}
					onItemDeleted={handleAdDelete}
				/>
			))}
		</div>
	);
}

export default GalleryAdsList;
