import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobePartsList from "../../../features/wardrobePartsList/components/wardrobePartsList";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { wardrobesContext } from "../../../features/wardrobeList/context/wardrobesContext";

function EditWardrobe() {
	const { wardrobeId } = useParams();
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const { wardrobes } = useContext(wardrobesContext);

	useEffect(() => {
		if (wardrobes) {
			const wardrobe = wardrobes.find((wardrobe) => wardrobe.id == wardrobeId);
			setTitle(wardrobe.title);
			setIsLoading(false);
		}
	}),
		[wardrobeId];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<PrimaryHeading text={title} />
			<WardrobePartsList />
		</>
	);
}

export default EditWardrobe;
