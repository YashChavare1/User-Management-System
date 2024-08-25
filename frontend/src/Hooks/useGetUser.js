import axios from "axios";
import { useEffect, useState } from "react";

export const useGetUser = (getUser = false) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const config = getUser
                    ? {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                    : {};

                const endpoint = getUser ? "/user/get-user" : "/user/get";
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${endpoint}`, config);

                if (getUser) {
                    setUserData(res.data.userData);
                } 
                else {
                    setUserData(res.data.users);
                }

                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { loading, userData };
};
