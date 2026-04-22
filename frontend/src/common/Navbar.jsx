import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import './Navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isSidebarOpen, toggleSidebar }) {


    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize dark mode state from localStorage
        return localStorage.getItem("darkMode") === "true";
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const location = useLocation();

    const getLoginInfo = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.iss || "User";
            } catch (error) {
                console.error("Error decoding token:", error);
                return "User";
            }
        }
        return "Guest";
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", newMode); // Save to localStorage
            return newMode;
        });
    };

    const handleLogout = () => {
        alert("Logged out!");
        localStorage.removeItem("token");
        setDropdownOpen(false);
        navigate("/", { replace: true });
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", isDarkMode);
    }, [isDarkMode]);

    return (
        <nav className="navbar">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <ul className="navbar-list">
                <li>
                    <NavLink
                        to="/home"
                        end
                        className={({ isActive }) =>
                            isActive ? "navbar-link active" : "navbar-link"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/home/appointments"
                        className={({ isActive }) =>
                            isActive ? "navbar-link active" : "navbar-link"
                        }
                    >
                        Appointments
                    </NavLink>
                </li>
            </ul>

            <div className="user-menu" ref={dropdownRef}>
                <span className="username">{getLoginInfo()}</span>
                <FaUserCircle className="user-icon" onClick={toggleDropdown} />
                {dropdownOpen && (
                    <div className="dropdown-content">
                        <button onClick={toggleDarkMode}>
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
        </nav>
    );
}