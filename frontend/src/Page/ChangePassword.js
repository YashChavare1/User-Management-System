import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import ProfileIcon from "../Assets/ProfileIcon.svg";
import { useUpdateUser } from "../Hooks/useUpdateUser";

export const ChangePassword = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const { loading, updateUser } = useUpdateUser("/user/change-password", data);

    return (
        <div className="change-password-form">
            <form onSubmit={updateUser}>
                <div className="profile-icon">
                    <img src={ProfileIcon} alt="profile icon" />
                    <h1>Change Password</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        onChange={handleInput}
                        placeholder="Enter Old Password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        onChange={handleInput}
                        placeholder="Enter New Password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        onChange={handleInput}
                        placeholder="Confirm New Password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                >
                    { loading ? "loading..." : "Change Password"}
                </button>

                <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate("/profile")}
                >
                    Cancel
                </button>
            </form >
        </div >
    );
};