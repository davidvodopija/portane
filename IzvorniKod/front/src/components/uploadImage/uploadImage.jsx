import React, { useState } from "react";
import "./uploadImage.css";
import Button from "../button/button";

function UploadImage({ setFile, text, isRound }) {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [fileName, setFileName] = useState("");
	const fileInputRef = React.useRef(null);

	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			if (file.size > 25 * 1024 * 1024) {
				alert("Please upload a file smaller than 25MB.");
				event.target.value = "";
				setFileUploaded(false);
				setFileName("");
				setFile(null);
			}
			if (!file.name.endsWith(".jpg") && !file.name.endsWith(".png")) {
				alert("Please upload a file with a .jpg or .png extension.");
				event.target.value = "";
				setFileUploaded(false);
				setFileName("");
				setFile(null);
			} else {
				setFileUploaded(true);
				setFileName(file.name);
				setFile(file);
			}
		}
	};

	const handleRemoveFile = () => {
		setFileUploaded(false);
		setFileName("");
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div
			className={`upload-area d-flex justify-content-center align-items-center flex-column rounded${
				isRound ? "-circle p-2 ratio-1" : ""
			} mb-5 mt-3 w-75`}>
			<div className="d-flex flex-column align-items-center justify-content-center">
				<i className="bi bi-upload"></i>
				<p className="mt-2">{text}</p>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				id="file-upload"
				className="file-upload-area"
				aria-label="Upload Image"
				onChange={handleFileChange}
				accept="image/jpeg, image/png"
			/>

			<div
				className={`upload-indicator d-flex flex-column align-items-center justify-content-center gap-2 ${
					fileUploaded ? "" : "d-none"
				}`}>
				<div>
					<i className="bi bi-check-circle text-success me-2"></i>
					File uploaded{isRound ? "!" : `: ${fileName}`}
				</div>
				<div className="bring-to-front">
					<Button
						size="xs"
						color="orange"
						radius="standard"
						onClick={handleRemoveFile}>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
}

export default UploadImage;
