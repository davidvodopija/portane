import React, { useState } from "react";
import userLogo from "../../../../assets/userLogo.png";
import "./sellerRegisterForm.css";

function StepTwo() {
	const [imagePreview, setImagePreview] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileName = file.name.toLowerCase();
			if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png")) {
				alert("Please upload a file with a .jpg or .png extension.");
				event.target.value = "";
				setImagePreview(null);
			} else {
				const reader = new FileReader();
				reader.onload = () => {
					setImagePreview(reader.result);
				};
				reader.readAsDataURL(file);
			}
		}
	};
	return (
		<>
			<div className="d-flex justify-content-center align-items-center mb-3">
				<div className="pic-container">
					<img
						src={imagePreview ? imagePreview : userLogo}
						alt="User logo preview"
						className="big-userlogo"
					/>
				</div>
			</div>
			<div className="mb-3">
				<input
					type="file"
					className="form-control"
					name="logo"
					id="logo"
					data-step="2"
					accept="image/jpeg, image/png"
					required
					onChange={handleFileChange}
				/>
			</div>
		</>
	);
}

export default StepTwo;
