import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavUser from './NavUser';

const SearchBookedProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [bookedProducts, setBookedProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchAttempted, setSearchAttempted] = useState(false);

    const userId = sessionStorage.getItem("userId"); // Retrieve user ID from session storage
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setErrorMessage('Please enter a product name to search.');
            setSearchAttempted(true);
            return;
        }

        setSearchAttempted(true);

        try {
            const response = await axios.get(`http://localhost:3030/api/bookings/search`, {
                params: {
                    userId,
                    name: searchTerm
                }
            });

            if (response.data.length === 0) {
                setBookedProducts([]); // Clear previous results
                setErrorMessage('No products found for your search.');
            } else {
                setBookedProducts(response.data);
                setErrorMessage(''); // Clear error message if search is successful
            }
        } catch (error) {
            console.error('Error fetching booked products:', error);
            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'An error occurred while fetching products. Please try again.';
            setErrorMessage(message);
        }
    };

    const handleResale = (product) => {
        // Redirect to the resale page with product information
        navigate('/resale', { state: { product } }); // Pass product info
    };

    return (
        <div style={styles.container}>
            <NavUser/>
            <h1>Search Your Booked Products</h1>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type the name of the product"
                    style={styles.input}
                />
                <button onClick={handleSearch} style={styles.button}>Search</button>
            </div>
            {errorMessage && searchAttempted && <p>{errorMessage}</p>}
            
            {bookedProducts.length > 0 && searchAttempted && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                    {bookedProducts.map((product) => (
                        <div key={product._id} style={cardStyle}>
                            <h3>{product.product.name}</h3>
                            <p><strong>Vendor:</strong> {product.vendorName}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Booking Date:</strong> {new Date(product.bookingDate).toLocaleDateString()}</p>
                            <button 
                                onClick={() => handleResale(product)} 
                                style={{ ...styles.resaleButton }} // Apply resale button styles
                            >
                                Resale
                            </button> {/* Resale button */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Inline CSS for card style
const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    width: '250px',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
};

// Additional styles for centering the search elements
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center',
        minHeight: '100vh', // Center vertically if the viewport height is full
    },
    searchContainer: {
        display: 'flex',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    button: {
        padding: '10px 15px',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    resaleButton: {
        padding: '10px 15px',
        borderRadius: '4px',
        backgroundColor: 'green', // Set button color to green
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default SearchBookedProducts;
