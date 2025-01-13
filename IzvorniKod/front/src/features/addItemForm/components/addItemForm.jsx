import Button from "../../../components/button/button.jsx";
import "./addItemForm.css";
import UploadImage from "./uploadImage.jsx";

function AddItemForm() {
	return (
		<div className="container my-5">
			<div className="d-flex justify-content-between mx-4 mb-2 top-text">
				<h1 className="title-style mb-3">DODAJ NOVI KOMAD ODJEĆE</h1>
				<h1 className="title-style mb-3">ORMAR 1</h1>
			</div>

			<form className="new-item-form border rounded p-4">
				<div className="d-flex justify-content-center">
					<UploadImage />
				</div>

				<div className="row mx-3">
					<div className="mb-0 pb-0">
						<label htmlFor="item-name" className="form-label">
							NAZIV ARTIKLA
						</label>
						<input
							type="text"
							id="item-name"
							className="form-control form-control-sm"
							placeholder="Value"
						/>
					</div>
					<div className="col-6 col-md-6 mt-3">
						<div className="mb-3">
							<label htmlFor="season" className="form-label">
								GODIŠNJE DOBA
							</label>
							<select
								id="season"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Proljeće</option>
								<option>Ljeto</option>
								<option>Jesen</option>
								<option>Zima</option>
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="style" className="form-label">
								STIL/LEŽERNOST
							</label>
							<select
								id="style"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Formalno</option>
								<option>Casual</option>
								<option>Sportski</option>
							</select>
						</div>

						<div className="mb-3">
							<label
								htmlFor="secondary-color"
								className="form-label"
							>
								SPOREDNA BOJA
							</label>
							<select
								id="secondary-color"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Crna</option>
								<option>Bijela</option>
								<option>Šarena</option>
							</select>
						</div>

						<div>
							<label htmlFor="location" className="form-label">
								LOKACIJA U ORMARU
							</label>
							<select
								id="location"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Gornja polica</option>
								<option>Srednja polica</option>
								<option>Donja polica</option>
							</select>
						</div>
					</div>

					<div className="col-6 col-md-6 mt-3">
						<div className="mb-3">
							<label htmlFor="category" className="form-label">
								KATEGORIJA
							</label>
							<select
								id="category"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Majice</option>
								<option>Hlače</option>
								<option>Obuća</option>
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
								id="primary-color"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Crna</option>
								<option>Bijela</option>
								<option>Šarena</option>
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="condition" className="form-label">
								STANJE/OČUVANOST
							</label>
							<select
								id="condition"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Novo</option>
								<option>Očuvano</option>
								<option>Loše</option>
							</select>
						</div>

						<div className="mb-3">
							<label
								htmlFor="footwear-type"
								className="form-label"
							>
								OTVORENOST
							</label>
							<select
								id="footwear-type"
								className="form-select"
								defaultValue=""
							>
								<option value="" disabled>
									Izaberi
								</option>
								<option>Otvoreno</option>
								<option>Poluotvoreno</option>
								<option>Zatvoreno</option>
							</select>
						</div>
					</div>
				</div>

				<div className="form-check mt-3">
					<input
						className="custom-control-input me-1"
						type="checkbox"
						id="share-item"
					/>
					<label
						className="form-check-label mb-4"
						htmlFor="share-item"
					>
						Podijeli ovaj artikl s ostalim korisnicima
					</label>
				</div>
				<div className="button-container">
					<Button
						size="long"
						color="red"
						radius="rounded"
						type="submit"
					>
						DODAJ ARTIKL U ORMAR
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddItemForm;
