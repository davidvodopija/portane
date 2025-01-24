import UploadImage from "../../../components/uploadImage/uploadImage";
import Button from "../../../components/button/button";
import "./addListingForm.css";
import { useContext, useEffect, useState, useRef } from "react";
import { handleFormSubmit } from "../../auth/utils/formUtils.jsx";
import { CodebooksContext } from "../../codebooks/context/codebooksContext";
import { galleriesContext } from "../../galleriesList/context/galleriesContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../utils/imageAPI.jsx";
import Select from "react-select";
import { addListingFormAPI } from "../api/addListingFormAPI.jsx";
import { getAdById } from "../../galleryView/api/galleryAdsAPI.jsx";

function AddListingForm() {
	const { codebooks } = useContext(CodebooksContext);
	const { galleries, getGalleries } = useContext(galleriesContext);
	const formRef = useRef(null);
	const { adId, galleryId } = useParams();
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
		galleryId: 0,
		price: null,
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (adId) {
			getAdById(adId).then((ad) => {
				setFormData({
					label: ad.article.label,
					picture: ad.article.picture,
					categoryId: ad.article.category.id,
					conditionId: ad.article.condition.id,
					footwearTypeId: ad.article.footwearType
						? ad.article.footwearType.id
						: 0,
					primaryColorId: ad.article.primaryColor.id,
					secondaryColorId: ad.article.secondaryColor.id,
					styleIds: ad.article.styles.map((s) => s.id),
					seasonId: ad.article.season.id,
					galleryId: galleryId,
					price: ad.price || 0,
					articleId: ad.article.id,
					id: ad.id,
				});
			});
		}
	}, []);

	useEffect(() => {
		if (codebooks && galleries) {
			setIsLoading(false);
		}
	}, [codebooks, galleries]);

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
				[id]: parseFloat(value) || value,
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
			if (!adId) {
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
					article: {
						label: formData.label,
						picture: image.result.link,
						categoryId: formData.categoryId,
						conditionId: formData.conditionId,
						footwearTypeId: formData.footwearType
							? formData.footwearTypeId
							: 0,
						primaryColorId: formData.primaryColorId,
						secondaryColorId: formData.secondaryColorId,
						styleIds: formData.styleIds,
						seasonId: formData.seasonId,
					},
					galleryId: formData.galleryId,
					price: formData.price,
				};
				response = await addListingFormAPI(updatedFormData);
			} else {
				const updatedFormData = {
					article: {
						label: formData.label,
						picture: formData.picture,
						categoryId: formData.categoryId,
						conditionId: formData.conditionId,
						footwearTypeId: formData.footwearType
							? formData.footwearTypeId
							: 0,
						primaryColorId: formData.primaryColorId,
						secondaryColorId: formData.secondaryColorId,
						styleIds: formData.styleIds,
						seasonId: formData.seasonId,
						id: formData.articleId,
					},
					galleryId: formData.galleryId,
					price: formData.price,
					id: formData.id,
				};
				if (updatedFormData.article.picture.name) {
					const image = await uploadImage(formData.picture);
					updatedFormData.article.picture = image.result.link;
				}
				response = await addListingFormAPI(updatedFormData);
			}
			if (response) {
				getGalleries().then(() => {
					history.back();
				});
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
				<h1 className="listing-title-style mb-3">DODAJ NOVI OGLAS</h1>
			</div>

			<form className="new-listing-form border rounded p-4" ref={formRef}>
				<div className="d-flex justify-content-center">
					<UploadImage
						setFile={setFile}
						text={"Učitaj fotografiju artikla"}
						isRound={false}
					/>
				</div>

				<p className="listing-title-style mx-3">
					Informacije o artiklu
				</p>
				<hr className="line mx-3" />

				<div className="row mx-3">
					<div className="mb-0 pb-0">
						<label htmlFor="item-name" className="form-label">
							NAZIV ARTIKLA
						</label>
						<input
							type="text"
							id="label"
							maxLength="40"
							className="form-control form-control-sm"
							placeholder="Ime artikla"
							required
							value={formData.label || ""}
							onChange={handleChange}
						/>
					</div>
					<div className="col-6 col-md-6 mt-3">
						<div className="mb-3">
							<label htmlFor="season" className="form-label">
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
							<label htmlFor="style" className="form-label">
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
								htmlFor="secondary-color"
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
						{formData.categoryId == 6 && (
							<div className="mb-3">
								<label
									htmlFor="footwear-type"
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

					<div className="col-6 col-md-6 mt-3">
						<div className="mb-3">
							<label htmlFor="category" className="form-label">
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
								htmlFor="primary-color"
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
							<label htmlFor="condition" className="form-label">
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
					</div>
				</div>

				<p className="listing-title-style mx-3">Informacije o oglasu</p>
				<hr className="line mx-3" />
				<div className="row mx-4">
					<div className="col-6 mb-3">
						<label htmlFor="style" className="form-label">
							GALERIJA
						</label>
						<select
							id="galleryId"
							className="form-select"
							required
							onChange={handleChange}
							value={formData.galleryId || ""}
						>
							<option value="" disabled>
								Izaberi
							</option>
							{galleries?.map((gallery) => (
								<option key={gallery.id} value={gallery.id}>
									{gallery.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-6 mb-4">
						<label htmlFor="style" className="form-label">
							CIJENA (€)
						</label>
						<input
							type="number"
							id="price"
							className="form-control"
							placeholder="Unesi cijenu"
							value={formData.price}
							onChange={handleChange}
							step={0.01}
							min={0}
						></input>
					</div>
				</div>

				<div className="button-container-s py-2">
					<Button
						size="long"
						color="red"
						radius="rounded"
						onClick={() => handleFormSubmit(formRef, handleSubmit)}
					>
						{adId ? "AŽURIRAJ OGLAS" : "PODIJELI OGLAS"}
					</Button>
				</div>
				<div className="d-flex justify-content-end mt-3">
					<Button color="red-clear" onClick={() => history.back()}>
						Odustani
					</Button>
				</div>
			</form>
		</div>
	);
}
export default AddListingForm;
