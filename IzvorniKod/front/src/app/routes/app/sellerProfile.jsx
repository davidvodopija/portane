import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading";
import Header from "../../../components/header/header";
import SellerInfo from "../../../features/userProfile/components/sellerInfo.jsx";
import GalleryList from "../../../features/galleriesList/components/galleryList.jsx";
import { useContext } from "react";
import { galleriesContext } from "../../../features/galleriesList/context/galleriesContext.jsx";

function SellerProfile() {
	const { galleries } = useContext(galleriesContext);
	return (
		<>
			<Header />
			<SellerInfo />

			<div className="d-flex justify-content-between pe-5 w-100">
				<SecondaryHeading
					text={` MOJE GALERIJE ARTIKALA (${
						galleries ? galleries.length : 0
					})`}
				/>
			</div>

			<GalleryList />
		</>
	);
}

export default SellerProfile;
