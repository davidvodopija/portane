import UploadImage from "../../../components/uploadImage/uploadImage";
import Button from "../../../components/button/button";
import "./addListingForm.css";

function AddListingForm() {
	return (
		<div className="container my-5">
			<div className="d-flex justify-content-between mx-4 mb-2 top-text">
				<h1 className="listing-title-style mb-3">DODAJ NOVI OGLAS</h1>
			</div>

			<form className="new-listing-form border rounded p-4">
				<div className="d-flex justify-content-center">
					<UploadImage />
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
							id="style"
							className="form-select"
							defaultValue=""
						>
							<option value="" disabled>
								Izaberi
							</option>
							<option>Galerija 1</option>
							<option>Galerija 2</option>
							<option>Galerija 3</option>
						</select>
					</div>
					<div className="col-6 mb-4">
						<label htmlFor="style" className="form-label">
							CIJENA
						</label>
						<input
							type="text"
							id="item-name"
							className="form-control"
							placeholder="Value"
						></input>
					</div>
				</div>

				<div className="button-container-s py-2">
					<Button
						size="long"
						color="red"
						radius="rounded"
						type="submit"
					>
						PODIJELI OGLAS
					</Button>
				</div>
			</form>
		</div>
	);
}
export default AddListingForm;
