import { useRef, useState } from "react";
import Button from "../../../../components/button/button.jsx";
import "../form.css";
import { handleFormSubmit } from "../../utils/formUtils.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import StepOne from "./stepOne.jsx";
import UploadImage from "../../../../components/uploadImage/uploadImage.jsx";
import { uploadImage } from "../../../../utils/imageAPI.jsx";
import { redirectToGoogleOAuth } from "../../utils/oauthUtil.jsx";

function SellerRegisterForm({ isUser, setIsUser }) {
	const formRef = useRef(null);
	const { registerUser } = useAuth();
	const [firstPage, setFirstPage] = useState(true);
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		password: "",
		logo: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const setFile = (file) => {
		setFormData((prevData) => ({
			...prevData,
			logo: file,
		}));
		if (file) {
			const currentStepFields =
				formRef.current.querySelectorAll('input[type="file"]');
			Array.from(currentStepFields).every((field) => {
				field.setCustomValidity("");
			});
		}
	};

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

	const handleSubmit = async (e) => {
		try {
			if (formData.logo == "") {
				const currentStepFields =
					formRef.current.querySelectorAll('input[type="file"]');
				Array.from(currentStepFields).every((field) => {
					field.setCustomValidity("Molimo postavite sliku profila");
					field.reportValidity();
				});
			} else {
				const image = await uploadImage(formData.logo);
				const data = {
					...formData,
					logo: image.result.link,
				};
				registerUser(data);
			}
		} catch (error) {
			console.error(error);
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
				{firstPage && <StepOne handleChange={handleChange} />}
				{!firstPage && (
					<div className="d-flex justify-content-center align-items-center">
						<UploadImage
							setFile={setFile}
							text={"Postavite sliku profila"}
							isRound={true}
						/>
					</div>
				)}
				{firstPage && (
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
				)}
				<div className="d-grid w-100 mb-3">
					<Button
						size="small"
						color="red"
						radius="normal"
						onClick={() => {
							firstPage
								? handleNext()
								: handleFormSubmit(formRef, handleSubmit);
						}}>
						{firstPage ? "Dalje" : "Registriraj se"}
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
			<h1
				className={`bi bi-arrow-right-short ${!firstPage ? "invisible" : ""}`}
				onClick={firstPage ? handleNext : undefined}></h1>
		</div>
	);
}

export default SellerRegisterForm;
