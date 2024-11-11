import { useRef } from "react";
import Button from "../../../../components/button/button.jsx";
import { handleFormSubmit } from "../../../../utils/formUtils.jsx";
import "../form.css";
import { useAuth } from "../../hooks/useAuth.jsx";

function LoginForm() {
	const formRef = useRef(null);

	const { user, isLoggedIn, registerUser, loginUser, logoutUser } = useAuth();

	return (
		<form className="border p-4 rounded-2" ref={formRef}>
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
					onClick={() => handleFormSubmit(formRef, loginUser)}>
					Prijavi se
				</Button>
			</div>
		</form>
	);
}

export default LoginForm;
