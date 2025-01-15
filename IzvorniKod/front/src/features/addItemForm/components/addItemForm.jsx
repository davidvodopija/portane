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

function AddItemForm() {
	const { codebooks } = useContext(CodebooksContext);
	const [wardrobeParts, setWardrobeParts] = useState([]);
	const { wardrobes } = useContext(wardrobesContext);
	const { wardrobeId } = useParams();
	const formRef = useRef(null);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		label: "",
		picture: "tmp",
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

	const handleSubmit = () => {
		addItemFormAPI(formData).then((response) => {
			if (response) {
				navigate(`/wardrobes/${wardrobeId}`);
			}
		});
	};

	return (
		<div className="container my-5">
			<div className="d-flex justify-content-between mx-4 mb-2 top-text">
				<h1 className="title-style mb-3">DODAJ NOVI KOMAD ODJEĆE</h1>
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
						onUpload={(url) =>
							setFormData({ ...formData, picture: url })
						}
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
							className="form-control form-control-sm"
							placeholder="Ime artikla"
							required
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
								defaultValue=""
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
								defaultValue=""
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
								defaultValue=""
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
								defaultValue=""
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
								defaultValue=""
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
								defaultValue=""
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
									defaultValue=""
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
						onChange={handleChange}
					/>
					<label className="form-check-label mb-4" htmlFor="public">
						Podijeli ovaj artikl s ostalim korisnicima
					</label>
				</div>
				<div className="button-container">
					<Button
						size="long"
						color="red"
						radius="rounded"
						onClick={() => handleFormSubmit(formRef, handleSubmit)}
					>
						DODAJ ARTIKL U ORMAR
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddItemForm;
