import { useEffect, useState } from "react";
import "./ProfilePage.css"
import ProfileIcon from "../../Assets/ProfileIcon.svg";
import { useDeleteUser } from "../../Hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../Hooks/useGetUser";
import { useUpdateUser } from "../../Hooks/useUpdateUser";
import { validateProfileUpdate } from "../../Utils/validateProfileUpdate";

export const ProfilePage = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        userId: "",
        name: "",
        email: "",
        dateOfBirth: "",
    });

    const navigate = useNavigate();
    const { userData, loading } = useGetUser(true);
    const { updateUser } = useUpdateUser("/user/update", user);
    const deleteUser = useDeleteUser();

    useEffect(() => {
        if (!loading && userData) {
            const { userId, name, email, dateOfBirth } = userData;
            const [year, month, day] = dateOfBirth.split("T")[0].split("-");
            setUser({
                userId,
                name,
                email,
                dateOfBirth: `${year}-${month}-${day}`,
            });
        }
    }, [loading, userData]);

    const handleInput = (event) => {
        const { name, value } = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleUpdateUser = (event) => {
        event.preventDefault();

        const validate = validateProfileUpdate(user, setErrors);
        
        if(!validate) {
            return;
        }

        updateUser();
    }

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <>
            <div className="profile-page-form">
                <form onSubmit={handleUpdateUser}>
                    <div className="profile-icon">
                        <img src={ProfileIcon} alt="profile icon" />
                        <h1>Profile</h1>
                    </div>
                    <p>User ID: <span> {user.userId} </span></p>
                    <div className="form-group">
                        <label htmlFor="name" className={errors.name ? "error-label" : ""}>Name</label>
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
                        <label htmlFor="email" className={errors.email ? "error-label" : ""}>Email ID</label>
                        <input
                            type="text"
                            name="email"
                            disabled={!isEditable}
                            onChange={handleInput}
                            value={user.email}
                            placeholder="Enter Email ID"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob" className={errors.dateOfBirth ? "error-label" : ""}>Date of Birth</label>
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
                        <button type="button" onClick={() => setIsEditable(true)}>Edit Profile</button>
                        <button type="button" onClick={() => navigate("/change-password")}>Change Password</button>
                        <button type="button" id="btn-delete" onClick={() => deleteUser()} >Delete Profile</button>
                    </>
                    }
                </div>
            </div>
        </>
    );
}