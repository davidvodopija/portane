const validateForm = (formRef) => {
	if (formRef.current.checkValidity()) {
		return true;
	} else {
		formRef.current.reportValidity();
		return false;
	}
};

export const handleFormSubmit = (formRef, providerFunction) => {
	if (validateForm(formRef)) {
		const formData = new FormData(formRef.current);
		const formJson = Object.fromEntries(formData.entries());
		providerFunction(formJson);
	}
};
