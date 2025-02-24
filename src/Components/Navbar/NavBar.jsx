import React, { useState } from 'react';
import './NavBar.css';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    // const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

    // // Function to toggle the dropdown visibility
    // const toggleDropdown = (event) => {
    //     event.preventDefault(); // Prevent default behavior (navigation)
    //     console.log('Dropdown Toggled');  // Debugging line to check if toggle works
    //     setDropdownOpen(!dropdownOpen); // Toggle dropdown state
    // };

    return (
        <nav>
            <img src={logo} alt="Logo" className="logo" />
            <ul>
         <a class="btn" href="/" role="button">Home</a>
         <a class="btn" href="/service" role="button">Services</a>
         <a class="btn" href="/login" role="button">Login</a>
         


        </ul>
        </nav>
    );
};

export default NavBar;




