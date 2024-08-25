import axios from "axios";
import { useEffect, useState } from "react";

export const useGetUser = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/get`);
                setUserData(res.data.users);
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
