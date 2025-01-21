import WardrobeItem from "./wardrobeItem";
import "./wardrobeItemsList.css";
import { useState, useEffect, useContext } from "react";
import { getAllWardrobeItems } from "../api/wardrobeItemsAPI";
import { useParams } from "react-router-dom";
import { wardrobesContext } from "../../wardrobeList/context/wardrobesContext";

function WardrobeItemsList() {
	const [items, setItems] = useState([]);
	const { wardrobeId } = useParams();
	const { getWardrobes } = useContext(wardrobesContext);

	useEffect(() => {
		getAllWardrobeItems(wardrobeId)
			.then((data) => setItems(data))
			.catch((error) => console.error(error));
	}, []);

	const handleItemDeleted = (deletedItemId) => {
		getAllWardrobeItems(wardrobeId)
			.then((data) => setItems(data))
			.catch((error) => console.error(error));
		getWardrobes();
	};

	return (
		<div className="wardrobe-items-container d-flex flex-wrap mx-5 mt-3 mb-5">
			{items.map((item) => (
				<WardrobeItem
					key={item.id}
					id={item.id}
					onItemDeleted={handleItemDeleted}
					wardrobeId={wardrobeId}
				/>
			))}
		</div>
	);
}

export default WardrobeItemsList;
