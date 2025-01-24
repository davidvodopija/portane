import { useRef } from "react";
import Button from "../../../../components/button/button.jsx";
import "../form.css";
import { handleFormSubmit } from "../../utils/formUtils.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { redirectToGoogleOAuth } from "../../utils/oauthUtil.jsx";

function UserRegisterForm({ isUser, setIsUser }) {
	const formRef = useRef(null);

	const { registerUser, _registerGoogleUser } = useAuth();

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
					minLength={6}
					pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$"
					title="Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
				/>
			</div>
			<div className="form-check mb-3">
				<input
					className="form-check-input"
					type="checkbox"
					value=""
					id="flexCheckDefault"
					checked={!isUser}
					onChange={() => setIsUser(false)}
				/>
				<label className="form-check-label" htmlFor="flexCheckDefault">
					Želim se registrirati kao prodavač
				</label>
			</div>
			<div className="d-grid w-100 mb-3">
				<Button
					size="small"
					color="red"
					radius="normal"
					onClick={() => handleFormSubmit(formRef, registerUser)}>
					Registriraj se
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

export default UserRegisterForm;
