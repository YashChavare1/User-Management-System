import { useState } from "react";
import axios from "axios";

export const useUpdateUser = (url, data) => {
    const [loading, setLoading] = useState(false);
    console.log(url, data);

    const updateUser = (event) => {
        event.preventDefault();
        setLoading(true);
        const userToken = localStorage.getItem("token");

        if (!userToken || userToken.length === 0) {
            localStorage.removeItem("token");
            alert("Please Login Again");
            setLoading(false);
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        .then((res) => {
            if (url === "/user/change-password") {
                alert("Password Updated");
                window.location.href = "/profile";
            }

            if (url === "/user/update") {
                alert("User Details Updated");
                window.location.reload();
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            alert("Updation Failed");
            setLoading(false);
        });
    };

    return { updateUser, loading };
};
