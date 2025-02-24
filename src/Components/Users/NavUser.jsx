import React, { useState } from 'react';
import logo from '../../assets/logo.jpg';
import './NavUser.css';

const NavUser = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Styles for the component
  const styles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'grey', // Top nav background color
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed', // Fixed positioning at the top
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    logo: {
      height: '50px',
      marginRight: '20px', // Space to the right of the logo
    },
    menuButton: {
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      color: '#333',
      backgroundColor: '#e7e7e7',
      transition: 'background-color 0.3s',
      cursor: 'pointer', // Indicate it's clickable
      marginLeft: 'auto', // Push menu button to the right
    },
    menuItems: {
      display: isMenuVisible ? 'flex' : 'none', // Show or hide menu items
      flexDirection: 'row', // Horizontal layout for menu items
      marginLeft: '20px', // Space between menu button and items
    },
    link: {
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      color: '#333',
      backgroundColor: '#e7e7e7',
      transition: 'background-color 0.3s',
      margin: '0 5px', // Space between menu items
    },
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Perform logout logic here (e.g., clear session, redirect to homepage)
      window.location.href = "/"; // Redirect to homepage after logout
    }
  };

  return (
    <nav style={styles.nav}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <span 
        style={styles.menuButton} 
        onClick={() => setIsMenuVisible(!isMenuVisible)} // Toggle menu visibility
      >
        Menu
      </span>
      <div style={styles.menuItems}>
        <a style={styles.link} href="/">Home</a>
        <a style={styles.link} href="/view-products">Available Products</a>
        <a style={styles.link} href="/view-my-bookings">My Orders</a>
        {/* <a style={styles.link} href="/return-booking/:bookingId">Return</a> */}
        <a style={styles.link} href="/postrates">Rates</a>
        <a style={styles.link} href="/search-booked-products">search</a>
        <span 
          style={styles.link} 
          onClick={handleLogout} // Trigger logout on click
        >
          Logout
        </span>
      </div>
    </nav>
  );
};

export default NavUser;
