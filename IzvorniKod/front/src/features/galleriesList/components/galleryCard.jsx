import "bootstrap/dist/css/bootstrap.css";
import "./galleryCard.css";
import galleryLogo from "../../../assets/galerija.png";
import CloseButton from "../../../components/closeButton/closeButton";

function GalleryCard() {
	return (
		<div className="gallery-card">
			<div className="card">
				<div className="close-button-wrapper">
					<CloseButton />
				</div>
				<img
					src={galleryLogo}
					className="card-img-top mx-auto pt-4"
					alt="Wardrobe icon"
				/>
				<div className="card-body p-0 d-flex flex-column align-items-center">
					<p className="card-txt m-0"> Galerija 1 (M)</p>
					<div className="m-3 text-secondary">
						<div>Ukupno oglasa: M</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GalleryCard;
