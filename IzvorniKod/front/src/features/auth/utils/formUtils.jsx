import { validateForm } from "../../../utils/formUtils.jsx";

export const handleFormSubmit = (formRef, providerFunction) => {
	if (validateForm(formRef)) {
		const formData = new FormData(formRef.current);
		const formJson = Object.fromEntries(formData.entries());
		providerFunction(formJson);
	}
};
