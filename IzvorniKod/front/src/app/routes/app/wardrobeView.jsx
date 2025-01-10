import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobeItemsList from "../../../features/wardrobeView/components/wardrobeItemsList";
import WardrobeControls from "../../../features/wardrobeView/components/wardrobeControls";
import "./wardrobeView.css";

function WardrobeView() {
	return (
		<>
			<Header />
			<PrimaryHeading text="ORMAR 1" />

			<div className="wardrobe-view d-flex">
				<WardrobeItemsList />
				<WardrobeControls />
			</div>
		</>
	);
}

export default WardrobeView;
