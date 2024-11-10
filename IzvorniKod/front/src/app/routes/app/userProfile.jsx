import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading";
import UserInfo from "../../../features/userProfile/components/userInfo";
import WardrobeCard from "../../../features/wardrobeList/components/wardrobeCard";
import WardrobeList from "../../../features/wardrobeList/components/wardrobeList";

function UserProfile() {
	return (
		<>
			<UserInfo></UserInfo>
			<SecondaryHeading text="MOJI ORMARI (n)" />
			<WardrobeList></WardrobeList>
		</>
	);
}
export default UserProfile;
