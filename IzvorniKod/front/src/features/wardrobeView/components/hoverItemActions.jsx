import "bootstrap/dist/css/bootstrap.css";
import "./hoverItemActions.css";
import { useEffect, useState } from "react";
import { findWardrobeItem } from "../api/wardrobeItemsAPI";
import { addItemFormAPI } from "../../addItemForm/api/addItemFormAPI";
import { deleteWardrobeItem } from "../api/wardrobeItemsAPI";
import { useNavigate } from "react-router-dom";

function HoverItemActions({ id, onItemDeleted, wardrobeId }) {
	const [item, setItem] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		findWardrobeItem(id).then((response) => {
			setItem(response);
			setIsLoading(false);
		});
	}, []);

	const shareWardrobeItem = () => {
		let newItem = {
			id: id,
			label: item.label,
			picture: item.picture,
			categoryId: item.category.id,
			conditionId: item.condition.id,
			footwearTypeId: item.footwearType ? item.footwearType.id : null,
			primaryColorId: item.primaryColor.id,
			secondaryColorId: item.secondaryColor.id,
			styleIds: item.styles.map((s) => s.id),
			seasonId: item.season.id,
			closetCustomComponentId: item.closetCustomComponent.id,
			public: !item.public,
		};
		addItemFormAPI(newItem).then((response) => {
			setItem(response);
		});
	};

	const handleDeleteWardrobeItem = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this item?"
		);

		if (confirmDelete) {
			try {
				await deleteWardrobeItem(id);
				onItemDeleted(id);
			} catch (error) {
				console.error("Couldnt delete item ", error);
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="hover-buttons gap-1 d-flex flex-wrap me-2 pe-1">
			<button
				className="btn btn-pink btn-sm"
				title="Share"
				onClick={shareWardrobeItem}
			>
				{item.public ? (
					<i className="bi bi-bookmark-dash-fill"></i>
				) : (
					<i className="bi bi-bookmark-plus"></i>
				)}
			</button>
			<button
				className="btn btn-sm"
				title="Edit"
				onClick={() =>
					navigate(`/wardrobes/${wardrobeId}/edit-item/${id}`)
				}
			>
				<i className="bi bi-pencil-square"></i>
			</button>
			<button
				className="btn text-danger btn-sm"
				title="Delete"
				onClick={() => handleDeleteWardrobeItem(id)}
			>
				<i className="bi bi-trash-fill"></i>
			</button>
		</div>
	);
}

export default HoverItemActions;
