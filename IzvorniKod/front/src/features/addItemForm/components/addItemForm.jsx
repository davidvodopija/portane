import Button from "../../../components/button/button.jsx";
import { handleFormSubmit } from "../../auth/utils/formUtils.jsx";
import { CodebooksContext } from "../../codebooks/context/codebooksContext.jsx";
import { wardrobesContext } from "../../wardrobeList/context/wardrobesContext.jsx";
import { getAllWardrobeParts } from "../../wardrobePartsList/api/wardrobePartsListAPI.jsx";
import { addItemFormAPI } from "../api/addItemFormAPI.jsx";
import "./addItemForm.css";
import UploadImage from "../../../components/uploadImage/uploadImage.jsx";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { uploadImage } from "../../../utils/imageAPI.jsx";
import { findWardrobeItem } from "../../wardrobeView/api/wardrobeItemsAPI.jsx";

function AddItemForm() {
	const { codebooks } = useContext(CodebooksContext);
	const [wardrobeParts, setWardrobeParts] = useState([]);
	const { wardrobes } = useContext(wardrobesContext);
	const { wardrobeId } = useParams();
	const { itemId } = useParams();
	const formRef = useRef(null);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		label: "",
		picture: "",
		categoryId: 0,
		conditionId: 0,
		footwearTypeId: 0,
		primaryColorId: 0,
		secondaryColorId: 0,
		styleIds: [],
		seasonId: 0,
		closetCustomComponentId: 0,
		public: false,
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllWardrobeParts(wardrobeId).then((response) => {
			setWardrobeParts(response);
		});
		if (itemId) {
			findWardrobeItem(itemId).then((item) => {
				setFormData({
					label: item.label || "",
					picture: item.picture || "",
					categoryId: item.category.id || 0,
					conditionId: item.condition.id || 0,
					footwearTypeId: item.footwearType
						? item.footwearType.id
						: 0,
					primaryColorId: item.primaryColor.id || 0,
					secondaryColorId: item.secondaryColor.id || 0,
					styleIds: item.styles.map((s) => s.id) || [],
					seasonId: item.season.id || 0,
					closetCustomComponentId: item.closetCustomComponent.id || 0,
					public: item.public || false,
				});
			});
		}
	}, []);

	useEffect(() => {
		if (codebooks && wardrobeParts && wardrobes) {
			setIsLoading(false);
		}
	}, [codebooks, wardrobeParts, wardrobes]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleChange = (e) => {
		const { id, value, type, checked } = e.target;
		if (type === "checkbox") {
			setFormData((prevData) => ({
				...prevData,
				[id]: checked,
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[id]: parseInt(value) || value,
			}));
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

	const handleSubmit = async () => {
		try {
			let response;
			if (!itemId) {
				if (formData.picture == "") {
					const pictureField =
						formRef.current.querySelectorAll("[type=file]");

					pictureField.forEach((field) => {
						field.setCustomValidity("Upload an image");
						field.reportValidity();
					});
					return;
				}
				const image = await uploadImage(formData.picture);
				const updatedFormData = {
					...formData,
					picture: image.result.link,
				};
				response = await addItemFormAPI(updatedFormData);
			} else {
				const updatedFormData = {
					...formData,
					id: itemId,
				};
				if (updatedFormData.picture.name) {
					const image = await uploadImage(formData.picture);
					updatedFormData.picture = image.result.link;
				}
				response = await addItemFormAPI(updatedFormData);
			}
			if (response) {
				navigate(`/wardrobes/${wardrobeId}`);
			}
		} catch (error) {
			console.error("Error while submitting the form:", error);
		}
	};

	const setFile = (file) => {
		if (file) {
			setFormData((prevData) => ({
				...prevData,
				picture: file,
			}));
			const pictureField =
				formRef.current.querySelectorAll("[type=file]");

			pictureField.forEach((field) => {
				field.setCustomValidity("");
			});
			return;
		} else {
			setFormData((prevData) => ({
				...prevData,
				picture: "",
			}));
		}
	};

	return (
		<div className="container my-5">
			<div className="d-flex justify-content-between mx-4 mb-2 top-text">
				<h1 className="title-style mb-3">
					{itemId ? "AŽURIRAJ ARTIKL" : "DODAJ NOVI KOMAD ODJEĆE"}
				</h1>
				<h1 className="title-style mb-3">
					{
						wardrobes.find((wardrobe) => wardrobe.id == wardrobeId)
							.title
					}
				</h1>
			</div>

			<form className="new-item-form border rounded p-4" ref={formRef}>
				<div className="d-flex justify-content-center">
					<UploadImage
						setFile={setFile}
						text={"Učitaj fotografiju artikla"}
						isRound={false}
					/>
				</div>

				<div className="row mx-3">
					<div className="mb-0 pb-0">
						<label htmlFor="label" className="form-label">
							NAZIV ARTIKLA
						</label>
						<input
							type="text"
							id="label"
							maxLength="30"
							className="form-control form-control-sm"
							placeholder="Ime artikla"
							required
							value={formData.label || ""}
							onChange={handleChange}
						/>
					</div>
					<div className="col-6 col-md-6 mt-3">
						<div className="mb-3">
							<label htmlFor="seasonId" className="form-label">
								GODIŠNJE DOBA
							</label>
							<select
								id="seasonId"
								className="form-select"
								required
								value={formData.seasonId || ""}
								onChange={handleChange}
							>
								<option value="" disabled>
									Izaberi
								</option>
								{codebooks.seasons.map((season) => (
									<option key={season.id} value={season.id}>
										{season.name}
									</option>
								))}
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="styleIds" className="form-label">
								STIL/LEŽERNOST
							</label>
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

						<div className="mb-3">
							<label
								htmlFor="secondaryColorId"
								className="form-label"
							>
								SPOREDNA BOJA
							</label>
							<select
								id="secondaryColorId"
								className="form-select"
								onChange={handleChange}
								value={formData.secondaryColorId || ""}
								required
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

						<div>
							<label
								htmlFor="closetCustomComponentId"
								className="form-label"
							>
								LOKACIJA U ORMARU
							</label>
							<select
								id="closetCustomComponentId"
								className="form-select"
								required
								onChange={handleChange}
								value={formData.closetCustomComponentId || ""}
							>
								<option value="" disabled>
									Izaberi
								</option>
								{wardrobeParts.map((part) => (
									<option key={part.id} value={part.id}>
										{part.title}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="col-6 col-md-6 mt-3">
						<div className="mb-3">
							<label htmlFor="categoryId" className="form-label">
								KATEGORIJA
							</label>
							<select
								id="categoryId"
								className="form-select"
								required
								onChange={handleChange}
								value={formData.categoryId || ""}
							>
								<option value="" disabled>
									Izaberi
								</option>
								{codebooks.categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</select>
						</div>

						<div className="mb-3">
							<label
								htmlFor="primaryColorId"
								className="form-label"
							>
								GLAVNA BOJA
							</label>
							<select
								id="primaryColorId"
								className="form-select"
								required
								onChange={handleChange}
								value={formData.primaryColorId || ""}
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

						<div className="mb-3">
							<label htmlFor="conditionId" className="form-label">
								STANJE/OČUVANOST
							</label>
							<select
								id="conditionId"
								className="form-select"
								required
								value={formData.conditionId || ""}
								onChange={handleChange}
							>
								<option value="" disabled>
									Izaberi
								</option>
								{codebooks.conditions.map((condition) => (
									<option
										key={condition.id}
										value={condition.id}
									>
										{condition.name}
									</option>
								))}
							</select>
						</div>

						{formData.categoryId == 6 && (
							<div className="mb-3">
								<label
									htmlFor="footwearTypeId"
									className="form-label"
								>
									OTVORENOST
								</label>
								<select
									id="footwearTypeId"
									className="form-select"
									required
									onChange={handleChange}
									value={formData.footwearTypeId || ""}
								>
									<option value="" disabled>
										Izaberi
									</option>
									{codebooks["footwear-types"].map((type) => (
										<option key={type.id} value={type.id}>
											{type.name}
										</option>
									))}
								</select>
							</div>
						)}
					</div>
				</div>

				<div className="form-check mt-3">
					<input
						className="custom-control-input me-1"
						type="checkbox"
						id="public"
						checked={formData.public || false}
						onChange={handleChange}
					/>
					<label className="form-check-label mb-4" htmlFor="public">
						Podijeli ovaj artikl s ostalim korisnicima
					</label>
				</div>
				<div className="button-container d-flex justify-content-center">
					<Button
						size="long"
						color="red"
						radius="rounded"
						onClick={() => handleFormSubmit(formRef, handleSubmit)}
					>
						{itemId ? "AŽURIRAJ ARTIKL" : "DODAJ ARTIKL U ORMAR"}
					</Button>
				</div>
				<div className="d-flex justify-content-end mt-3">
					<Button
						color="red-clear"
						onClick={() => navigate(`/wardrobes/${wardrobeId}`)}
					>
						Odustani
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddItemForm;
