import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading";
import Header from "../../../components/header/header";
import SellerInfo from "../../../features/userProfile/components/sellerInfo.jsx";
import GalleryList from "../../../features/galleriesList/components/galleryList.jsx";

function SellerProfile() {
	return (
		<>
			<Header />
			<SellerInfo />

			<div className="d-flex justify-content-between pe-5 w-100">
				<SecondaryHeading text="MOJE GALERIJE ARTIKALA (N)" />
			</div>

			<GalleryList />
		</>
	);
}

export default SellerProfile;
