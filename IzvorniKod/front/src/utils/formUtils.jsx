export const validateForm = (formRef) => {
    if (formRef.current.checkValidity()) {
        return true;
    } else {
        formRef.current.reportValidity();
        return false;
    }
};