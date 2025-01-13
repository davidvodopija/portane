import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobeItemsList from "../../../features/wardrobeView/components/wardrobeItemsList";
import WardrobeControls from "../../../features/wardrobeView/components/wardrobeControls";
import "./wardrobeView.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllWardrobes } from "../../../features/wardrobeList/api/wardrobesAPI";

function WardrobeView() {
	const { wardrobeId } = useParams();
	const [title, setTitle] = useState("");

	useEffect(() => {
		getAllWardrobes()
			.then((response) => {
				response.forEach((part) => {
					if (part.id == wardrobeId) {
						setTitle(part.title);
					}
				});
			})
			.catch((error) => {
				console.error("Error getting wardrobe parts:", error);
			});
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
