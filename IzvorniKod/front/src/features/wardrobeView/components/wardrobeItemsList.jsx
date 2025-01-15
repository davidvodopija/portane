import WardrobeItem from "./wardrobeItem";
import "./wardrobeItemsList.css";
import placeholder from "../../../assets/placeholderImg.png";
import { useState, useEffect } from "react";
import { getAllWardrobeItems } from "../api/wardrobeItemsAPI";
import { useParams } from "react-router-dom";
function WardrobeItemsList() {
	const [items, setItems] = useState([]);
	const { wardrobeId } = useParams();

	useEffect(() => {
		getAllWardrobeItems(wardrobeId)
			.then((data) => setItems(data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="wardrobe-items-container d-flex flex-wrap mx-5">
			{items.map((item) => (
				<WardrobeItem
					key={item.id}
					src={placeholder}
					location={item.closetCustomComponent.title}
					itemName={item.label}
				/>
			))}
		</div>
	);
}

export default WardrobeItemsList;
