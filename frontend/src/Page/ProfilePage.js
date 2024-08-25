import { useState } from "react";
import "./ProfilePage.css"
import ProfileIcon from "../Assets/ProfileIcon.svg";
import { useDeleteUser } from "../Hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [user, setUser] = useState({
        userId: "1",
        name: "Yash Chavare",
        email: "yashchavare1@gmail.com",
        dateOfBirth: "2000-12-15",

    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const deleteUser = useDeleteUser();

    return (
        <>
            <div className="profile-page-form">
                <form action="">
                    <div className="profile-icon">
                        <img src={ProfileIcon} alt="profile icon" />
                        <h1>Profile</h1>
                    </div>
                    <p>User ID: <span> {user.userId} </span></p>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            disabled={!isEditable}
                            onChange={handleInput}
                            value={user.name}
                            placeholder="Enter Name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input
                            type="email"
                            name="email"
                            disabled={!isEditable}
                            onChange={handleInput}
                            value={user.email}
                            placeholder="Enter Email ID"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            disabled={!isEditable}
                            onChange={handleInput}
                            value={user.dateOfBirth}
                        />
                    </div>

                    {isEditable && <div className="form-group">
                        <input
                            type="submit"
                            value="Update Details"
                            className="btn-submit"
                        />
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => setIsEditable(false)}
                        >
                            Cancel
                        </button>
                    </div>}
                </form>

                <div className="manage-buttons"> 
                    {!isEditable && <>
                        <button type="button" onClick={ () => setIsEditable(true) }>Edit Profile</button>
                        <button type="button" onClick={ () => navigate("/change-password") }>Change Password</button>
                        <button type="button" id="btn-delete" onClick={ () => deleteUser() } >Delete Profile</button>
                    </>
                    }
                </div>
            </div>
        </>
    );
}
