import React, { useState } from 'react';
import './AdNav.css'; // You can still use this for additional styles
import logo from '../../assets/logo.jpg';

const AdNav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            // Clear session storage or token
            sessionStorage.clear();
            // Redirect to the homepage
            window.location.href = "/";
        }
    };

    return (
        <div style={sidebarStyle}>
            <img src={logo} alt='' className='logo' style={logoStyle} />
            <button 
                onClick={toggleDropdown} 
                style={menuButtonStyle}
            >
                Menu
            </button>
            {isDropdownOpen && (
                <ul style={dropdownStyle}>
                    <li><a className="btn" href="/" style={linkStyle}>Home</a></li>
                    <li><a className="btn" href="/view" style={linkStyle}>View Users</a></li>
                    <li><a className="btn" href="/viewvendor" style={linkStyle}>View Vendors</a></li>
                    <li><a className="btn" href="/search" style={linkStyle}>Search</a></li>
                    <li><a className="btn" href="/postcreate" style={linkStyle}>Create Post</a></li>
                    <li><a className="btn" href="/admin-posts" style={linkStyle}>View Post</a></li>
                    <li><button className="btn" onClick={handleLogout} style={logoutButtonStyle}>Logout</button></li>
                </ul>
            )}
        </div>
    );
};

// Inline styles for the sidebar and its elements
const sidebarStyle = {
    width: '200px',
    height: '100vh',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
};

const logoStyle = {
    height: '50px',
    marginBottom: '20px',
};

const menuButtonStyle = {
    backgroundColor: '#555',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    display: 'block',
};

const dropdownStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    display: 'block',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
};

const logoutButtonStyle = {
    backgroundColor: '#d9534f',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
};

export default AdNav;
