import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Nav.css';
import logo from '../../assets/logo.jpg';

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Clear user session data (adjust as needed)
    sessionStorage.removeItem('userId'); // Remove user ID from session storage
    // You can add more session clearing logic if needed
    navigate('/'); // Redirect to the home page after logout
  };

  // Styles for the component
  const styles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'grey', // Background color for the navbar
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      position: 'fixed', // Fixed positioning at the top
      top: 0,
      left: 0,
      right: 0,
     // Position for absolute child elements
    },
    logo: {
      height: '70px',
    },
    menuButton: {
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      color: '#333',
      backgroundColor: '#e7e7e7',
      transition: 'background-color 0.3s',
      cursor: 'pointer', // Indicate it's clickable
    },
    menuItems: {
      display: isDropdownOpen ? 'flex' : 'none', // Show items when dropdown is open
      flexDirection: 'row', // Horizontal layout for menu items
      marginLeft: '10px', // Space between menu button and items
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
      display: 'flex', // Display menu items in a row
    },
    li: {
      marginLeft: '5px', // Reduced space between menu items
      marginRight: '5px', // Added margin to the right to further control spacing
    },
    link: {
      textDecoration: 'none',
      padding: '5px 10px', // Reduced padding for links
      borderRadius: '4px',
      color: '#333',
      backgroundColor: '#e7e7e7',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <nav style={styles.nav}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span 
          style={styles.menuButton} 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle menu items
        >
          Menu
        </span>
        <div style={styles.menuItems}>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <a style={styles.link} href="/">Home</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="/add-product">Add Products</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="/viewproducts">View Products</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="/vendorbookings">Received Orders</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="/returns/:vendorId">View Returns</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="/viewrate">Rates</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="/vendor-view">View Resale</a>
            </li>
            <li style={styles.li}>
              <span style={styles.link} onClick={handleLogout}>Logout</span> {/* Logout option */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
