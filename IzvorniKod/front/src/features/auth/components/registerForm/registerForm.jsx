import Button from "../../../../components/button/button.jsx";
import "../form.css";

function RegisterForm() {
	return (
		<form className="border p-4 rounded-2">
			<div className="mb-3">
				<label htmlFor="name" className="form-label">
					Ime
				</label>
				<input
					type="text"
					className="form-control"
					id="name"
					placeholder="Unesite ime"
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="lastname" className="form-label">
					Prezime
				</label>
				<input
					type="text"
					className="form-control"
					id="lastname"
					placeholder="Unesite prezime"
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					Email
				</label>
				<input
					type="email"
					className="form-control"
					id="email"
					placeholder="Unesite email"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="form-label">
					Lozinka
				</label>
				<input
					type="password"
					className="form-control"
					id="password"
					placeholder="Unesite lozinku"
				/>
			</div>
			<div className="d-grid gap-3 col-6 w-100">
				<Button size="small" color="red" radius="normal">
					Registriraj se
				</Button>
			</div>
		</form>
	);
}

export default RegisterForm;
