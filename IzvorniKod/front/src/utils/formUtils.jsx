const validateForm = (formRef) => {
	if (formRef.current.checkValidity()) {
		return true;
	} else {
		formRef.current.reportValidity();
		return false;
	}
};

export const handleFormSubmit = (formRef, apiFunction) => {
	if (validateForm(formRef)) {
		const formData = new FormData(formRef.current);
		const formJson = Object.fromEntries(formData.entries());
		apiFunction(formJson);
	}
};
