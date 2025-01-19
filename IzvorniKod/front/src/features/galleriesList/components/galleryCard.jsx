import "bootstrap/dist/css/bootstrap.css";
import "./galleryCard.css";
import galleryLogo from "../../../assets/galerija.png";
import CloseButton from "../../../components/closeButton/closeButton";
import ConfirmationModal from "../../../components/conformatioAlert/conformationModal";
import { useContext, useState } from "react";
import { galleriesContext } from "../context/galleriesContext";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/button";
import { useAuth } from "../../auth/hooks/useAuth";
import { createGallery } from "../api/galleriesAPI";

function GalleryCard({ galleryName, adsCount, galleryId }) {
	const { user } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const { deleteGallery, setGalleries, galleries, getGalleries } =
		useContext(galleriesContext);
	const [isAdding, setIsAdding] = useState(galleryId == -1);
	const [newGalleryName, setNewGalleryName] = useState(galleryName);
	const navigate = useNavigate();

	const finalizeGallery = () => {
		let name = newGalleryName;
		if (name.trim() === "") {
			alert("Name is required to add a new gallery!");
			return;
		}
		const newGallery = {
			name: newGalleryName,
		};
		createGallery(newGallery).then(() => {
			getGalleries();
			setNewGalleryName("");
			setIsAdding(false);
		});
	};

	const handleRemoveGallery = () => {
		setShowModal(true);
	};

	const confirmRemoval = () => {
		deleteGallery(galleryId);
		setShowModal(false);
	};

	const cancelRemoval = () => {
		setShowModal(false);
	};

	const handleChange = (e) => {
		setNewGalleryName(e.target.value);
	};

	return (
		<div className="gallery-card">
			<div className="card">
				<div className="close-button-wrapper">
					<CloseButton onClick={handleRemoveGallery} />
				</div>
				<img
					src={galleryLogo}
					className="card-img-top mx-auto pt-4"
					alt="Gallery icon"
				/>
				<div className="card-body p-0 d-flex flex-column align-items-center">
					{isAdding ? (
						<div className="new-gallery d-flex flex-column align-items-center">
							<input
								type="text"
								className=" mb-2 px-3 form-control form-control-sm"
								placeholder="Ime galerije"
								onChange={handleChange}
							/>
							<Button
								size="xs"
								color="orange"
								radius="standard"
								onClick={finalizeGallery}
							>
								Spremi
							</Button>
						</div>
					) : (
						<div className="d-flex flex-column align-items-center">
							<p className="card-txt m-0">{galleryName}</p>
							<div className="m-3 text-secondary">
								Ukupno oglasa: {adsCount}
							</div>
						</div>
					)}
				</div>
			</div>
			<ConfirmationModal
				show={showModal}
				message="Are you sure you want to remove this gallery?"
				onConfirm={confirmRemoval}
				onCancel={cancelRemoval}
			/>
		</div>
	);
}

export default GalleryCard;
