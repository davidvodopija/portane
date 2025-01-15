import OutfitImg from "../../../assets/outfit.jpg";
import Button from "../../../components/button/button";
import "./outfitGeneratorForm.css";

function OutfitGeneratorForm() {
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
				<form className="outfit-params-form border rounded p-5 col-5 col-md-6">
					<div className="mb">
						<label className="form-label">GLAVNA BOJA</label>
						<select className="form-select">
							<option defaultValue="">Izaberi</option>
						</select>
					</div>
					<div className="mb">
						<label className="form-label">
							DATUM ili VREMENSKE PRILIKE
						</label>
						<select className="form-select">
							<option defaultValue="">Izaberi</option>
						</select>
					</div>
					<div className="mb">
						<label className="form-label">VRSTA PRIGODE</label>
						<select className="form-select">
							<option defaultValue="">Izaberi</option>
						</select>
					</div>
					<div className="button-container2 py-2">
						<Button color="red" size="long" radius="rounded">
							IZGRADI KOMBINACIJU
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
export default OutfitGeneratorForm;
