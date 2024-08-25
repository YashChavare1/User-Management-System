import { UserCard } from "../UserCard/UserCard";
import { useGetUser } from "../../Hooks/useGetUser";
import "./UserList.css";

export const UserList = () => {
    const { userData, loading } = useGetUser();

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="card-list">
            <h1>User List</h1>
            {userData.length !== 0 ? <div className="cards">
                {
                    userData.map((user) => (
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