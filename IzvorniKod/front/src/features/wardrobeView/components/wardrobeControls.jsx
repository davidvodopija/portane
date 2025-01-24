import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeControls.css";
import CoathangerImg from "../../../assets/coathanger.png";
import ClothingRack from "../../../assets/clothingrack.png";
import Button from "../../../components/button/button";
import { useParams, useNavigate } from "react-router-dom";

function WardrobeControls() {
	const { wardrobeId } = useParams();
	const navigate = useNavigate();
	return (
		<div className="wardrobe-controls d-flex gap-3">
			<div className="control-component d-flex">
				<img src={CoathangerImg} />
				<Button
					size="small"
					color="orange"
					radius="mediumround"
					onClick={() =>
						navigate(`/wardrobes/${wardrobeId}/add-item`)
					}
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
					onClick={() =>
						navigate("/wardrobes/" + wardrobeId + "/edit")
					}
				>
					IZMIJENI ORMAR
				</Button>
			</div>
		</div>
	);
}
export default WardrobeControls;
