export const validateFormData = (formData, setErrors, signIn) => {
    const newErrors = {};

    if (!signIn && !formData.name || !/^[a-zA-Z\s]+$/.test(formData.name)) {
        newErrors.name = "Name should only contain letters";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
    }

    if (!signIn && !formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.password || formData.password.length < 4) {
        newErrors.password = "Password must be at least 6 characters long";
    }

    if (!signIn && !formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
    } else if (!signIn && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

