import PrimaryHeading from "../../../components/primaryHeading/primaryHeading";
import Header from "../../../components/header/header";
import WardrobePartsList from "../../../features/wardrobePartsList/components/wardrobePartsList";

function EditWardrobe() {
	return (
		<>
			<Header />
			<PrimaryHeading text="ORMAR 1" />
			<WardrobePartsList />
		</>
	);
}

export default EditWardrobe;
