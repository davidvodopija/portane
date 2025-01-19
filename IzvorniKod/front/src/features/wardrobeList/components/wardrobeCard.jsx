import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeCard.css";
import wardrobeLogo from "../../../assets/wardrobeLogo.png";
import CloseButton from "../../../components/closeButton/closeButton";
import ConfirmationModal from "../../../components/conformatioAlert/conformationModal.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { wardrobesContext } from "../context/wardrobesContext.jsx";

function WardrobeCard({
	wardrobeName,
	numOfShelves,
	numOfDrawers,
	numOfRods,
	wardrobeID,
}) {
	const [showModal, setShowModal] = useState(false);
	const { deleteWardrobe } = useContext(wardrobesContext);
	const navigate = useNavigate();

	const handleRemoveWardrobe = () => {
		setShowModal(true);
	};

	const confirmRemoval = () => {
		deleteWardrobe(wardrobeID);
		setShowModal(false);
	};

	const cancelRemoval = () => {
		setShowModal(false);
	};

	return (
		<div className="wardrobe-card">
			<div className="card">
				<div className="close-button-wrapper">
					<CloseButton onClick={handleRemoveWardrobe} />
				</div>
				<img
					src={wardrobeLogo}
					className="card-img-top mx-auto pt-4"
					alt="Wardrobe icon"
				/>
				<div
					className="card-body p-0 d-flex flex-column align-items-center"
					onClick={() => navigate(`/wardrobes/${wardrobeID}`)}>
					<a className="card-txt m-0">{wardrobeName}</a>
					<div className="m-3 text-secondary">
						<div>Polica: {numOfShelves.quantity}</div>
						<div>Ladica: {numOfDrawers.quantity}</div>
						<div>Šipki za odjeću: {numOfRods.quantity}</div>
					</div>
				</div>
			</div>

			{/* Confirmation modal */}
			<ConfirmationModal
				show={showModal} // Pass the show state to control visibility
				message="Are you sure you want to remove this wardrobe?"
				onConfirm={confirmRemoval}
				onCancel={cancelRemoval}
			/>
		</div>
	);
}

export default WardrobeCard;
