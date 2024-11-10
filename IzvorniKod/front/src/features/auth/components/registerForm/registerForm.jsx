import { useRef } from "react";
import Button from "../../../../components/button/button.jsx";
import "../form.css";
import { register } from "../../api/authAPI.jsx";
import { handleFormSubmit } from "../../../../utils/formUtils.jsx";

function RegisterForm() {
	const formRef = useRef(null);

	return (
		<form className="border p-4 rounded-2" ref={formRef}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">
					Ime
				</label>
				<input
					type="text"
					className="form-control"
					name="firstname"
					id="name"
					placeholder="Unesite ime"
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="lastname" className="form-label">
					Prezime
				</label>
				<input
					type="text"
					className="form-control"
					name="lastname"
					id="lastname"
					placeholder="Unesite prezime"
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					Email
				</label>
				<input
					type="email"
					className="form-control"
					name="email"
					id="email"
					placeholder="Unesite email"
					required
					pattern="^\S+@\S+\.\S+$"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="form-label">
					Lozinka
				</label>
				<input
					type="password"
					className="form-control"
					name="password"
					id="password"
					placeholder="Unesite lozinku"
					required
				/>
			</div>
			<div className="d-grid w-100">
				<Button
					size="small"
					color="red"
					radius="normal"
					onClick={() => handleFormSubmit(formRef, register)}>
					Registriraj se
				</Button>
			</div>
		</form>
	);
}

export default RegisterForm;
