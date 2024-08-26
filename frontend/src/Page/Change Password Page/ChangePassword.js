import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import ProfileIcon from "../../Assets/ProfileIcon.svg";
import { useUpdateUser } from "../../Hooks/useUpdateUser";
import { validateChangePassword } from "../../Utils/validateChangePassword";

export const ChangePassword = () => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const { loading, updateUser } = useUpdateUser("/user/change-password", data);

    const handleChangePassword = (event) => {
        event.preventDefault();

        const validate = validateChangePassword(data, setErrors);

        if (!validate) {
            return;
        }

        updateUser();
    }

    return (
        <div className="change-password-form">
            <form onSubmit={handleChangePassword}>
                <div className="profile-icon">
                    <img src={ProfileIcon} alt="profile icon" />
                    <h1>Change Password</h1>
                </div>
                <div className="form-group">
                    <label className={errors.oldPassword ? "error-label" : ""}>Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        onChange={handleInput}
                        placeholder="Enter Old Password"
                    />
                </div>

                <div className="form-group">
                    <label className={errors.newPassword ? "error-label" : ""}>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        onChange={handleInput}
                        placeholder="Enter New Password"
                    />
                </div>

                <div className="form-group">
                    <label className={errors.confirmPassword ? "error-label" : ""}>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleInput}
                        placeholder="Confirm New Password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                >
                    {loading ? "loading..." : "Change Password"}
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