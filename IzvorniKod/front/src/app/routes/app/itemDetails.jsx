import "bootstrap/dist/css/bootstrap.css";
import ItemInfo from "../../../features/itemInfo/components/itemInfo";
import ContactInfo from "../../../features/itemInfo/components/contactInfo";
import WardrobeCard from "../../../features/wardrobeList/components/wardrobeCard";

function itemDetailView() {
	return (
		<>
			<ItemInfo />
			<ContactInfo />
		</>
	);
}

export default itemDetailView;
