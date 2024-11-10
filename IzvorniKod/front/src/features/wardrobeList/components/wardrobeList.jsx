import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeList.css";
import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading";
import WardrobeCard from "../../../features/wardrobeList/components/wardrobeCard";

function WardrobeList() {
	return (
		<div className="w-75">
			<div className="wardrobes-container d-flex flex-wrap mx-5 ">
				<WardrobeCard />
				<WardrobeCard />
				<WardrobeCard />
				<WardrobeCard />
			</div>
		</div>
	);
}

export default WardrobeList;
