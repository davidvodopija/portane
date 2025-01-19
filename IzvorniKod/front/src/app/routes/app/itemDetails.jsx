import "bootstrap/dist/css/bootstrap.css";
import ItemInfo from "../../../features/itemInfo/components/itemInfo";
import ContactInfo from "../../../features/itemInfo/components/contactInfo";
import Header from "../../../components/header/header";
import { useLocation } from "react-router-dom";

function itemDetailView() {
	const location = useLocation();
	const fromWardrobe = location.pathname.includes("/wardrobes");

	return (
		<>
			<Header />
			<ItemInfo />
			{fromWardrobe && <div className="my-5 pt-5"></div>}
			{!fromWardrobe && <ContactInfo />}
		</>
	);
}

export default itemDetailView;
