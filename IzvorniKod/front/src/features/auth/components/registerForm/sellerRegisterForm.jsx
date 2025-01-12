import { useRef, useState } from "react";
import Button from "../../../../components/button/button.jsx";
import "../form.css";
import { handleFormSubmit } from "../../utils/formUtils.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import StepOne from "./stepOne.jsx";
import StepTwo from "./stepTwo.jsx";

function SellerRegisterForm({ isUser, setIsUser }) {
	const formRef = useRef(null);
	const { registerUser } = useAuth();
	const [firstPage, setFirstPage] = useState(true);

	const handleNext = () => {
		const currentStepFields =
			formRef.current.querySelectorAll(`[data-step="1"]`);
		const isValid = Array.from(currentStepFields).every((field) =>
			field.checkValidity()
		);
		if (isValid) {
			setFirstPage(false);
		} else {
			currentStepFields.forEach((field) => field.reportValidity());
		}
	};

	const handlePrevious = () => {
		setFirstPage(true);
	};

	const handleSubmit = (e) => {
		if (firstPage) {
			handleNext();
		} else {
			setFirstPage(true);
			console.log(formRef.current);
			handleFormSubmit(formRef, registerUser);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center gap-3">
			<h1
				className={`bi bi-arrow-left-short ${firstPage ? "invisible" : ""}`}
				onClick={!firstPage ? handlePrevious : undefined}></h1>
			<form
				className="border p-4 rounded-2"
				ref={formRef}
				onSubmit={handleSubmit}>
				{firstPage && <StepOne />}
				{!firstPage && <StepTwo />}
				<div className="form-check mb-3">
					<input
						className="form-check-input"
						type="checkbox"
						value=""
						id="flexCheckDefault"
						checked={!isUser}
						onChange={() => setIsUser(true)}
					/>
					<label className="form-check-label" htmlFor="flexCheckDefault">
						Želim se registrirati kao prodavač
					</label>
				</div>
				<div className="d-grid w-100">
					<Button
						size="small"
						color="red"
						radius="normal"
						onClick={handleSubmit}>
						{firstPage ? "Dalje" : "Registriraj se"}
					</Button>
				</div>
			</form>
			<h1
				className={`bi bi-arrow-right-short ${!firstPage ? "invisible" : ""}`}
				onClick={firstPage ? handleNext : undefined}></h1>
		</div>
	);
}

export default SellerRegisterForm;
