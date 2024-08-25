import axios from "axios";

export const useAddUser = (data, setLoading) => {
    const addUser = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { confirmPassword, ...formData } = data;

        if (formData.password !== confirmPassword) {
            alert("Password & confirm password do not match");
            setLoading(false);
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/user/sign-up`, formData)
            .then(res => {
                localStorage.setItem("token", res.data.userToken);
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                const errorMessage = error.response?.data?.message || "Some issue occurred";
                alert(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    return { addUser };
};