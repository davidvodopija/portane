import "bootstrap/dist/css/bootstrap.css";
import "./galleryList.css";
import GalleryCard from "./galleryCard";
import { useContext, useEffect, useState } from "react";
import { galleriesContext } from "../context/galleriesContext";
import { useAuth } from "../../auth/hooks/useAuth";

function GalleryList() {
	const { galleries } = useContext(galleriesContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (galleries) {
			setIsLoading(false);
		}
	}, [galleries]);

	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return <div> Not logged in</div>;
	}

	if (isLoading) {
		return <div> Loading...</div>;
	}

	if (galleries.length === 0) {
		return (
			<div className="container-fluid ps-4 pb-2">
				Created galleries will be visible here
			</div>
		);
	}

	return (
		<div className="galleries-container d-flex flex-wrap mx-5 mb-5">
			{galleries.map((gallery) => {
				const { name, adsCount, id } = gallery;
				return (
					<div key={id} className="form-group">
						<GalleryCard
							galleryName={name}
							galleryId={id}
							adsCount={adsCount}
						/>
					</div>
				);
			})}
		</div>
	);
}
export default GalleryList;
