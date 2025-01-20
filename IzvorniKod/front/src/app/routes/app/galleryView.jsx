import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import GalleryAdsList from "../../../features/galleryView/components/galleryAdsList";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { galleriesContext } from "../../../features/galleriesList/context/galleriesContext";

function GalleryView() {
	const { galleryId } = useParams();
	const [name, setName] = useState("");
	const { galleries } = useContext(galleriesContext);

	useEffect(() => {
		if (galleries) {
			const gallery = galleries.find(
				(gallery) => gallery.id == galleryId
			);
			setName(gallery.name);
		}
	}),
		[galleryId];

	return (
		<>
			<Header />
			<PrimaryHeading text={name} />

			<div className="wardrobe-view d-flex">
				<GalleryAdsList />
			</div>
		</>
	);
}

export default GalleryView;
