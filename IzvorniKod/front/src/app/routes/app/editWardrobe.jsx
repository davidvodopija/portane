import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobePartsList from "../../../features/wardrobePartsList/components/wardrobePartsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllWardrobes } from "../../../features/wardrobeList/api/wardrobesAPI";

function EditWardrobe() {
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
			<WardrobePartsList />
		</>
	);
}

export default EditWardrobe;
