import OutfitImg from "../../../assets/outfit.jpg";
import Button from "../../../components/button/button";
import { CodebooksContext } from "../../codebooks/context/codebooksContext.jsx";
import { handleFormSubmit } from "../../auth/utils/formUtils.jsx";
import "./outfitGeneratorForm.css";
import { useState, useRef, useContext, useEffect } from "react";
import { generateOutfit } from "../api/outfitGeneratorAPI.jsx";
import { useNavigate } from "react-router-dom";
import { selectRandomSubcategories } from "../utils/categoriesUtils.jsx";
import { wardrobesContext } from "../../wardrobeList/context/wardrobesContext.jsx";
import Select from "react-select";

function OutfitGeneratorForm() {
	const { codebooks } = useContext(CodebooksContext);
	const formRef = useRef(null);
	const { items } = useContext(wardrobesContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		categoryIds: [],
		colorId: 0,
		date: "2025-01-21",
		styleIds: [],
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (codebooks) {
			setIsLoading(false);
		}
	}, [codebooks]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: parseInt(value) || value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const selectedCategoryIds = await selectRandomSubcategories(items);
			const updatedFormData = {
				...formData,
				categoryIds: selectedCategoryIds,
			};
			const response = await generateOutfit(updatedFormData);

			if (response) {
				navigate(`/outfit-suggestion`, {
					state: { outfit: response, formData: updatedFormData },
				});
			}
		} catch (error) {
			console.error("Error while submitting the form:", error);
		}
	};

	const handleSelectChange = (selectedOptions, actionMeta) => {
		const { name } = actionMeta;
		const values = selectedOptions
			? selectedOptions.map((option) => option.value)
			: [];
		setFormData((prevData) => ({
			...prevData,
			[name]: values,
		}));
	};

	return (
		<div className="container my-5">
			<h1 className="title-style-red ms-3">
				IZGRADI SVOJU MODNU KOMBINACIJU
			</h1>
			<div className="flex-container d-flex justify-content-center align-items-center my-5 gap-4 ">
				<img
					src={OutfitImg}
					alt="Outfit icon"
					className="outfit-img pe-5"
				/>
				<form
					className="outfit-params-form border rounded p-5 col-5 col-md-6"
					ref={formRef}
				>
					<div className="mb">
						<label htmlFor="colorId" className="form-label">
							GLAVNA BOJA
						</label>
						<select
							id="colorId"
							className="form-select"
							onChange={handleChange}
							required
							value={formData.colorId || ""}
						>
							<option value="" disabled>
								Izaberi
							</option>
							{codebooks.colors.map((color) => (
								<option key={color.id} value={color.id}>
									{color.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb">
						<label className="form-label">DATUM NOŠENJA</label>
						<input
							className="form-control"
							type="date"
							min={new Date().toISOString().split("T")[0]}
							max={
								new Date(
									new Date().setDate(new Date().getDate() + 4)
								)
									.toISOString()
									.split("T")[0]
							}
						/>
					</div>
					<div className="mb">
						<label className="form-label">VRSTA PRIGODE</label>
						<Select
							id="styleIds"
							name="styleIds"
							isMulti
							required
							options={codebooks.styles.map((style) => ({
								value: style.id,
								label: style.name,
							}))}
							value={formData.styleIds.map((id) => ({
								value: id,
								label: codebooks.styles.find(
									(style) => style.id === id
								)?.name,
							}))}
							onChange={handleSelectChange}
						/>
					</div>
					<div className="button-container2 py-2">
						<Button
							color="red"
							size="long"
							radius="rounded"
							onClick={() =>
								handleFormSubmit(formRef, handleSubmit)
							}
						>
							IZGRADI KOMBINACIJU
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
export default OutfitGeneratorForm;
