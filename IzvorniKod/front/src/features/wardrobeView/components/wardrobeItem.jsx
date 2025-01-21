import "./wardrobeItem.css";
import HoverItemActions from "../../../components/hoverItemActions/hoverItemActions";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteWardrobeItem, findWardrobeItem } from "../api/wardrobeItemsAPI";
import { addItemFormAPI } from "../../addItemForm/api/addItemFormAPI";
import placeholder from "../../../assets/placeholderImg.png";

function WardrobeItem({ id, onItemDeleted, wardrobeId }) {
	const navigate = useNavigate();
	const [item, setItem] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

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

	const handleDeleteWardrobeItem = async () => {
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

	const handleEditWardrobeItem = () => {
		navigate(`/wardrobes/${wardrobeId}/edit-item/${id}`);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="card wardrobe-item-card">
			<img
				src={item.picture || placeholder}
				className="card-img-top"
				alt={item.label}
				onClick={() => navigate(`/wardrobes/${wardrobeId}/item-details/${id}`)}
			/>

			<div className="card-body p-0 pb-2">
				<div className="actions-on-hover d-flex justify-content-end">
					<HoverItemActions
						shared={item.public}
						onShare={shareWardrobeItem}
						onEdit={handleEditWardrobeItem}
						onDelete={handleDeleteWardrobeItem}
					/>
				</div>
				<p className="card-location ms-3 mb-0">
					{item.closetCustomComponent.title}
				</p>
				<a
					className="card-text ms-3"
					onClick={() =>
						navigate(`/wardrobes/${wardrobeId}/item-details/${id}`)
					}>
					{item.label}{" "}
				</a>
			</div>
		</div>
	);
}

export default WardrobeItem;
