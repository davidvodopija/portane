import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading";
import UserInfo from "../../../features/userProfile/components/userInfo";
import WardrobeCard from "../../../features/wardrobeList/components/wardrobeCard";
import WardrobeList from "../../../features/wardrobeList/components/wardrobeList";
import Header from "../../../components/header/header";
import SearchBar from "../../../components/searchBar/searchBar";

function UserProfile() {
	return (
		<>
			<Header />
			<UserInfo></UserInfo>

			<div className="d-flex justify-content-between pe-5 w-100">
				<SecondaryHeading text="MOJI ORMARI (n)" />
				<div className="mt-2 pt-5">
					<SearchBar size="small" text="Pretraži svoje ormare" />
				</div>
			</div>

			<WardrobeList></WardrobeList>
		</>
	);
}

export default UserProfile;
