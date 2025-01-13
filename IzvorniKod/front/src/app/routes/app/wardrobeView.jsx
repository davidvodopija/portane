import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobeItemsList from "../../../features/wardrobeView/components/wardrobeItemsList";
import WardrobeControls from "../../../features/wardrobeView/components/wardrobeControls";
import "./wardrobeView.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWardrobes } from "../../../features/wardrobeList/hooks/useWardrobes";

function WardrobeView() {
	const { wardrobeId } = useParams();
	const [title, setTitle] = useState("");

	const { wardrobes } = useWardrobes();

	useEffect(() => {
		if (wardrobes) {
			const wardrobe = wardrobes.find((wardrobe) => wardrobe.id == wardrobeId);
			setTitle(wardrobe.title);
		}
	}),
		[wardrobeId];

	return (
		<>
			<Header />
			<PrimaryHeading text={title} />

			<div className="wardrobe-view d-flex">
				<WardrobeItemsList />
				<WardrobeControls />
			</div>
		</>
	);
}

export default WardrobeView;
