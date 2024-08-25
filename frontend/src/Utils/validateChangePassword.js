export const validateChangePassword = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.oldPassword) {
        newErrors.oldPassword = "Old password is required";
    }

    if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
    }
    
    if (formData.newPassword < 4) {
        alert("Password Should be atleast of length 6");
        newErrors.newPassword = "Password Should be atleast of length 6";
    }

    if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
    } 
    
    if(formData.newPassword !== formData.confirmPassword) {
        alert("Password do not match");
        newErrors.confirmPassword = "Passwords do not match";
        newErrors.newPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

