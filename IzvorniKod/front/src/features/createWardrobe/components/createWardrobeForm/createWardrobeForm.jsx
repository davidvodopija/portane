import React, { useRef, useState, useEffect, useContext } from "react";
import Button from "../../../../components/button/button.jsx";
import "./createWardrobeForm.css";
import MapLocationForm from "../MapLocationWidget/MapLocationWidget.jsx";
import { handleFormSubmit } from "../../utils/formUtils.jsx";
import { CodebooksContext } from "../../../codebooks/context/codebooksContext.jsx";
import { createWardrobe } from "../../api/createWardrobeAPI.jsx";
import { wardrobesContext } from "../../../wardrobeList/context/wardrobesContext.jsx";

function CreateWardrobeForm() {
	const formRef = useRef(null);
	const { codebooks } = useContext(CodebooksContext);
	const [formData, setFormData] = useState({});
	const [wardrobeName, setWardrobeName] = useState("");
	const [location, setLocation] = useState({latitude: '', longitude: ''});
	const [isLoading, setIsLoading] = useState(true);
	const { getWardrobes } = useContext(wardrobesContext);

	useEffect(() => {
		if (codebooks && codebooks["closet-components"]) {
			setFormData(
				codebooks["closet-components"].reduce((acc, component) => {
					acc[component.name] = "";
					return acc;
				}, {})
			);
			setIsLoading(false);
		}
	}, [codebooks]);

	const handleInputChange = (name, value) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	if (isLoading || !codebooks["closet-components"]) {
		return <div>Loading...</div>;
	}

	const addWardrobe = async (data) => {
		try {
			await createWardrobe(data);
			getWardrobes();
		} catch (error) {
			console.error("Error adding wardrobe:", error);
		}
	};

	return (
		<div className="m-3 mt-4 p-4 create-closet-form">
			<p className="title-style">NOVI ORMAR - NOVI PROSTOR ZA STIL</p>
			<form ref={formRef}>
				<div className="mb-3">
					<label htmlFor="wardrobeName" className="form-label">
						NAZIV ORMARA
					</label>
					<input
						type="text"
						name="wardrobeName"
						value={wardrobeName}
						onChange={(e) => setWardrobeName(e.target.value)}
						placeholder={`Unesite naziv ormara`}
						className="form-control w-50"
						required
					/>
				</div>

				{codebooks["closet-components"].map((component) => {
					const { name, id } = component;

					return (
						<div key={id} className="form-group mb-4">
							<label htmlFor={name} className="form-label">
								{name.toUpperCase()}
							</label>
							<input
								type="number"
								id={id}
								name={id}
								value={formData[name]}
								onChange={(e) => handleInputChange(name, e.target.value)}
								placeholder={`Unesite broj ${name.toLowerCase()}`}
								className="form-control w-50"
								min="0"
								max="10"
							/>
						</div>
					);
				})}

				<div className="mb-3">
                    <div className="form-label">LOKACIJA ORMARA</div>
                    <div className="col-8">
                        <MapLocationForm className="mb-3" location={location} setLocation={setLocation}/>
                    </div>
                </div>

				<div className="mt-4 pt-2">
					<Button
						size="small"
						color="red"
						radius="rounded"
						type="submit"
						onClick={() => handleFormSubmit(formRef, location, addWardrobe)}>
						Kreiraj ormar
					</Button>
				</div>
			</form>
		</div>
	);
}

export default CreateWardrobeForm;
