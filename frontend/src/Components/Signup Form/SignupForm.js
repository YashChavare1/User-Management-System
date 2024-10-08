import { useEffect, useState } from "react";
import { useAddUser } from "../../Hooks/useAddUser";
import { useSignIn } from "../../Hooks/useSignIn";
import "./SignupForm.css";
import { validateFormData } from "../../Utils/validateFormData";

export const SignupForm = () => {
    const [signIn, setSignIn] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const { addUser } = useAddUser(formData, setLoading);
    const { signInUser } = useSignIn(formData, setLoading);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const validate = validateFormData(formData, setErrors, signIn);

        if (validate) {
            if(signIn) {
                signInUser();
            }
            else {
                addUser();
            }
        }
    };

    useEffect(() => {
        setErrors({});
    }, [signIn]);

    return (
        <div className="signup-form">
            <h1>{signIn ? "Sign In" : "Sign Up"}</h1>
            <div className="input-fields">
                <form onSubmit={handleFormSubmit}>
                    {!signIn &&
                        <div className="form-group">
                            <label htmlFor="name" className={errors.name ? "error-label" : ""}>Name</label>
                            <input type="text" name="name" onChange={handleInput} placeholder="Enter Name" />
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="email" className={errors.email ? "error-label" : ""}>Email ID</label>
                        <input type="text" name="email" onChange={handleInput} placeholder="Enter Email ID" />
                    </div>

                    {!signIn &&
                        <div className="form-group">
                            <label htmlFor="dob" className={errors.dateOfBirth ? "error-label" : ""}>Date of Birth</label>
                            <input type="date" name="dateOfBirth" onChange={handleInput} />
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="password" className={errors.password ? "error-label" : ""}>Password</label>
                        <input type="password" name="password" onChange={handleInput} placeholder="Enter Password" />
                    </div>

                    {!signIn &&
                        <div className="form-group">
                            <label htmlFor="confirm-password" className={errors.confirmPassword ? "error-label" : ""}>Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={handleInput} placeholder="Confirm Password" />
                        </div>
                    }

                    <div className="form-group">
                        <input type="submit" value={loading ? "Loading..." : (signIn ? "Sign In" : "Sign Up")} className="btn-submit" />
                    </div>
                </form>

                <div className="signin-option">
                    <p>{signIn ? "Create an Account." : "Already have an account?"}</p>
                    <button className="btn-signin" onClick={() => setSignIn(!signIn)}>{signIn ? "Sign Up" : "Sign In"}</button>
                </div>
            </div>
        </div>
    );
};
