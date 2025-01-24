import { useRef, useState } from "react";
import Button from "../../../../components/button/button.jsx";
import { handleFormSubmit } from "../../utils/formUtils.jsx";
import "../form.css";
import { useAuth } from "../../hooks/useAuth.jsx";
import { redirectToGoogleOAuth } from "../../utils/oauthUtil.jsx";

function LoginForm() {
	const formRef = useRef(null);
	const [isUser, setIsUser] = useState(true);
	const { loginUser } = useAuth();

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
			<div className="form-check mb-3">
				<input
					className="form-check-input"
					type="checkbox"
					value=""
					id="flexCheckDefault"
					checked={!isUser}
					onChange={() => setIsUser(!isUser)}
				/>
				<label className="form-check-label" htmlFor="flexCheckDefault">
					Želim se prijaviti kao prodavač
				</label>
			</div>
			<div className="d-grid w-100 mb-3">
				<Button
					size="small"
					color="red"
					radius="normal"
					onClick={() => handleFormSubmit(formRef, loginUser)}>
					Prijavi se
				</Button>
			</div>
			<div className="d-grid w-100 mb-3">
				<Button
					size="small"
					color="white"
					radius="normal"
					onClick={() => {
						redirectToGoogleOAuth(isUser);
					}}>
					<i className="bi bi-google pull-left fs-6"></i>
					<span className="ms-4">Prijavi se putem Google-a</span>
				</Button>
			</div>
		</form>
	);
}

export default LoginForm;
