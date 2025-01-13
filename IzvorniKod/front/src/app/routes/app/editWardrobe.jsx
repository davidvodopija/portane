import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobePartsList from "../../../features/wardrobePartsList/components/wardrobePartsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWardrobes } from "../../../features/wardrobeList/hooks/useWardrobes";

function EditWardrobe() {
	const { wardrobeId } = useParams();
	const [title, setTitle] = useState("");

	const { wardrobes } = useWardrobes();

	useEffect(() => {
		if (wardrobes) {
			const wardrobe = wardrobes.find((wardrobe) => wardrobe.id == wardrobeId);
			setTitle(wardrobe.name);
		}
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
