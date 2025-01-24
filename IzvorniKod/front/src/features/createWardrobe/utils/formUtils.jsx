import { validateForm } from "../../../utils/formUtils.jsx";

const reformatFormData = (elements, location) => {
	const formattedData = {
		title: "",
		componentsList: [],
		latitude : location.latitude,
		longitude : location.longitude
	};

	const formElements = Array.from(elements).filter((element) => element.name);

	if (formElements.length > 0) {
		formattedData.title = formElements[0].value;

		for (let i = 1; i < formElements.length; i++) {
			const component = {
				id: parseInt(formElements[i].id, 10),
				quantity: parseInt(
					formElements[i].value ? formElements[i].value : 0,
					0
				),
			};
			formattedData.componentsList.push(component);
		}
	}
	return formattedData;
};

// Usage within handleFormSubmit
export const handleFormSubmit = (formRef, location, providerFunction) => {
	if (validateForm(formRef)) {
		const formattedData = reformatFormData(formRef.current.elements, location);
		providerFunction(formattedData);
	}
};
