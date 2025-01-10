import WardrobeItem from "./wardrobeItem";
import "./wardrobeItemsList.css";
import placeholder from "../../../assets/placeholderImg.png";

function WardrobeItemsList() {
	return (
		<div className="wardrobe-items-container d-flex flex-wrap mx-5">
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
			<WardrobeItem
				src={placeholder}
				location="Lokacija u ormaru"
				itemName="Naziv artikla"
			/>
		</div>
	);
}

export default WardrobeItemsList;
