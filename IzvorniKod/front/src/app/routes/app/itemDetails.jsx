import "bootstrap/dist/css/bootstrap.css";
import ItemInfo from "../../../features/itemInfo/components/itemInfo";
import ContactInfo from "../../../features/itemInfo/components/contactInfo";
import Header from "../../../components/header/header" 
function itemDetailView() {
	return (
		<>
			<Header/>
			<ItemInfo />
			<ContactInfo />
		</>
	);
}

export default itemDetailView;
