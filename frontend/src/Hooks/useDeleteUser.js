import axios from "axios";

export const useDeleteUser = () => {
    return async () => {
        const token = localStorage.getItem("token");
        const userApproval = window.confirm("Are you sure you want to delete your profile?");

        if (!userApproval) {
            return;
        }

        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(res.data.message);
            localStorage.removeItem("token");
            window.location.replace("/");
        } 
        catch (error) {
            console.error(error);
            alert("Some issue occurred");
        }
    };
};
