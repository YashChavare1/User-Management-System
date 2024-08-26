import { UserCard } from "../UserCard/UserCard";
import { useGetUser } from "../../Hooks/useGetUser";
import "./UserList.css";
import { UserListNavbar } from "../User List Navbar/UserListNavbar";
import { useEffect, useState } from "react";

export const UserList = () => {
    const { userData, loading } = useGetUser();
    const [displayUser, setDisplayUsers] = useState([]);

    useEffect(() => {
        setDisplayUsers(userData);
    }, [userData]);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="card-list">
            <h1>User List</h1>
            { displayUser.length > 0 && <UserListNavbar userData={userData} setDisplayUsers={setDisplayUsers} />}
            {displayUser.length !== 0 ? <div className="cards">
                {
                    displayUser.map((user) => (
                        <UserCard userData={user} key={user.userId} />
                    ))
                }
            </div>
                :
                <div className="no-data-found">
                    <p>No user data found</p>
                </div>
            }
        </div>
    );
};