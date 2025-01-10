import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeControls.css";
import CoathangerImg from "../../../assets/coathanger.png";
import ClothingRack from "../../../assets/clothingrack.png";
import Button from "../../../components/button/button";

function WardrobeControls() {
	return (
		<div className="wardrobe-controls d-flex gap-3">
			<div className="control-component d-flex">
				<img src={CoathangerImg} />
				<Button
					size="small"
					color="orange"
					radius="mediumround"
					onClick={() => navigate("/add-item")}
				>
					DODAJ NOVI KOMAD ODJEĆE
				</Button>
			</div>

			<div className="control-component d-flex">
				<img className="opacity-75" src={ClothingRack} />
				<Button
					size="small"
					color="orange"
					radius="mediumround"
					onClick={() => navigate("/edit-wardrobe")}
				>
					IZMIJENI ORMAR
				</Button>
			</div>
		</div>
	);
}
export default WardrobeControls;
