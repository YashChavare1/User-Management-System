import axios from "axios";

export const useSignIn = (data, setLoading) => {
    const signInUser = async(event) => {
        event.preventDefault();
        setLoading(true);

        const { email, password } = data;

        axios.post(`${process.env.REACT_APP_BASE_URL}/user/sign-in`, { email, password })
            .then(res => {
                localStorage.setItem("token", res.data.userToken);
                window.location.replace("/");
            })
            .catch(error => {
                console.error(error);
                const errorMessage = error.response?.data?.message || "Some issue occurred";
                alert(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    }  

    return { signInUser };
};
