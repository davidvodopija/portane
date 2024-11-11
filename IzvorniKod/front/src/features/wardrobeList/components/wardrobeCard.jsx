import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeCard.css";
import wardrobeLogo from "../../../assets/wardrobeLogo.png";
import CloseButton from "../../../components/closeButton/closeButton";

function WardrobeCard() {
	return (
		<div className="wardrobe-card">
			<div className="card">
				<div className="close-button-wrapper">
					<CloseButton></CloseButton>
				</div>
				<img
					src={wardrobeLogo}
					className="card-img-top mx-auto"
					alt="Wardrobe icon"
				/>
				<div className="card-body mx-auto">
					<p className="card-text">Ormar1 (n)</p>
					<div className="text-secondary">
						<div> Polica: x</div>
						<div> Ladica: y</div>
						<div> Šipki za odjeću: z</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WardrobeCard;
