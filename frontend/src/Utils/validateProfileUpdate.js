export const validateProfileUpdate = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.name) {
        newErrors.name = "Name is required";
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
        newErrors.name = "Name should only contain letters";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
    }
    if (!formData.email) {
        newErrors.email = "Email is required";
    }

    if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of Birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

