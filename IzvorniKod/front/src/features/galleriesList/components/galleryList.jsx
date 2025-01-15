import "bootstrap/dist/css/bootstrap.css";
import "./galleryList.css";
import GalleryCard from "./galleryCard";

function GalleryList() {
	return (
		<div className="galleries-container d-flex flex-wrap mx-5 mb-5">
			<GalleryCard />
			<GalleryCard />
			<GalleryCard />
			<GalleryCard />
			<GalleryCard />
		</div>
	);
}

export default GalleryList;
