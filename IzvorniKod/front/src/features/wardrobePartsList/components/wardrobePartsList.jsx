import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	createWardrobePart,
	getAllWardrobeParts,
	removeWardrobePart,
	renameWardrobePart,
} from "../api/wardrobePartsListAPI";
import { handleFormSubmit } from "../../auth/utils/formUtils";
import { useRef } from "react";
import { CodebooksContext } from "../../codebooks/context/codebooksContext";

function WardrobePartsList() {
	const { wardrobeId } = useParams();
	const [wardrobePartsList, setWardrobePartsList] = useState([]);
	const [editingPartId, setEditingPartId] = useState(null);
	const [editedPart, setEditedPart] = useState("");
	const formRef = useRef(null);
	const { codebooks } = useContext(CodebooksContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (codebooks && codebooks["closet-components"]) {
			getAllWardrobeParts(wardrobeId)
				.then((response) => {
					setWardrobePartsList(response);
				})
				.catch((error) => {
					console.error("Error getting wardrobe parts:", error);
				});
			setIsLoading(false);
		}
	}, [codebooks]);

	const handleDelete = (id) => {
		removeWardrobePart(id)
			.then(() => {
				getAllWardrobeParts(wardrobeId)
					.then((response) => {
						setWardrobePartsList(response);
					})
					.catch((error) => {
						console.error("Error getting wardrobe parts:", error);
					});
			})
			.catch((error) => {
				console.error("Error deleting wardrobe part:", error);
			});
	};

	const handleSave = (id, newName) => {
		renameWardrobePart(id, newName)
			.then(() => {
				getAllWardrobeParts(wardrobeId)
					.then((response) => {
						setWardrobePartsList(response);
					})

					.catch((error) => {
						console.error("Error getting wardrobe parts:", error);
					});
			})
			.catch((error) => {
				console.error("Error renaming wardrobe part:", error);
			});
	};

	const handleAdd = () => {
		handleFormSubmit(formRef, (data) => {
			createWardrobePart(wardrobeId, data).then(() => {
				getAllWardrobeParts(wardrobeId)
					.then((response) => {
						setWardrobePartsList(response);
					})
					.catch((error) => {
						console.error("Error getting wardrobe parts:", error);
					});
			});
		});
	};

	const handleEditClick = (part) => {
		setEditingPartId(part.id);
		setEditedPart(part.title);
	};

	const handleInputChange = (e) => {
		setEditedPart(e.target.value);
	};

	const handleSaveClick = () => {
		handleSave(editingPartId, editedPart);
		setEditingPartId(null);
	};

	const handleCancelClick = () => {
		setEditingPartId(null);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container p-3 pt-0">
			<table className="table table-striped text-center align-middle">
				<thead>
					<tr>
						<th>NAZIV KOMPONENTE</th>
						<th>VRSTA KOMPONENTE</th>
					</tr>
				</thead>
				<tbody>
					{wardrobePartsList.map((part) => {
						return (
							<tr key={part.id}>
								<td>
									{editingPartId === part.id ? (
										<input
											type="text"
											name="title"
											value={editedPart}
											onChange={handleInputChange}
										/>
									) : (
										part.title
									)}
								</td>
								<td>{part.componentType}</td>
								<td>
									{editingPartId === part.id ? (
										<>
											<button
												className="btn btn-link border-0 text-danger p-0 me-2"
												onClick={handleSaveClick}
											>
												Save
											</button>
											<button
												className="btn btn-link border-0 text-danger p-0 ms-2"
												onClick={handleCancelClick}
											>
												Cancel
											</button>
										</>
									) : (
										<>
											<button
												className="btn btn-link border-0 text-danger p-0 me-2"
												onClick={() =>
													handleEditClick(part)
												}
											>
												Edit
											</button>
											<button
												className="btn btn-link border-0 text-danger p-0 ms-2"
												onClick={() =>
													handleDelete(part.id)
												}
											>
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<form
				className="d-flex align-items-center justify-content-around mt-3"
				ref={formRef}
			>
				<div className="d-flex gap-3 w-75">
					<h4 className="bi bi-plus pt-1"></h4>
					<input
						type="text"
						className="form-control"
						placeholder="Naziv komponente"
						name="title"
						required
					/>
					<select
						className="form-select text-secondary"
						name="id"
						required
					>
						<option disabled value="DEFAULT">
							Odaberi vrstu komponente
						</option>
						{codebooks["closet-components"].map((category) => {
							return (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<a
					className="text-danger cursor"
					role="button"
					onClick={() => handleAdd()}
				>
					Add new
				</a>
			</form>
		</div>
	);
}

export default WardrobePartsList;
