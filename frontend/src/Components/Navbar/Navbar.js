import { useLocation, useNavigate } from "react-router-dom";
import profileIcon from "../../Assets/ProfileIcon.svg";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef();

    const userToken = localStorage.getItem("token");
    const profile = location.pathname==="/profile"

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            window.location.reload();
        } 
        else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        const logoutConfirmation = window.confirm("Want to Logout ?");

        if(!logoutConfirmation) {
            return;
        }
        
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }

    const handleProfileClick = () => {
        setShowDropdown(false);
        navigate("/profile")
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return(
        <div className="navbar">
            <div className="logo">
                <img src="https://storecdn.goqii.com/media/goqiiweb/assets/images/site-logo.png" alt="Goqii Icon" onClick={handleLogoClick} />
            </div>
            <div className="heading">
                GOQii - User Management
            </div>
            <div className="profile">
                { userToken && <img src={profileIcon} alt="profile" onClick={() => setShowDropdown(!showDropdown)} /> }
                {showDropdown && (
                            <div className="dropdown-menu" ref={dropdownRef}>
                                { !profile && <button onClick={handleProfileClick}>Profile</button>}
                                <button onClick={handleLogout} id="logout">Logout</button>
                            </div>
                        )}
            </div>
        </div>
    )
}; 