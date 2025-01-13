import React, { useState } from "react";
import "./UploadImage.css";
import Button from "../../../components/button/button";

function UploadImage() {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [fileName, setFileName] = useState("");
	const fileInputRef = React.useRef(null);

	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setFileUploaded(true);
			setFileName(file.name);
		} else {
			setFileUploaded(false);
			setFileName("");
		}
	};

	const handleRemoveFile = () => {
		setFileUploaded(false);
		setFileName("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="upload-area rounded mb-5 mt-3 w-75 ">
			<i className="bi bi-upload"></i>
			<p className="mt-2">Učitaj fotografiju artikla</p>
			<input
				ref={fileInputRef}
				type="file"
				id="file-upload"
				className="file-upload-area"
				aria-label="Upload Image"
				onChange={handleFileChange}
				disabled
			/>
			{fileUploaded && (
				<div className="upload-indicator d-flex flex-column align-items-center justify-content-center gap-2">
					<div className="">
						<i className="bi bi-check-circle text-success me-2"></i>
						File uploaded: <strong>{fileName}</strong>
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
			)}
		</div>
	);
}

export default UploadImage;
