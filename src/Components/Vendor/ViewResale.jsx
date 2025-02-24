import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

const ViewResale = () => {
    const [resales, setResales] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const vendorId = sessionStorage.getItem('vendorId'); // Retrieve vendor ID from session storage

    useEffect(() => {
        const fetchResales = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/api/resales/vendor/${vendorId}`);
                setResales(response.data);
            } catch (error) {
                console.error('Error fetching resale requests:', error);
                const message = error.response?.data?.message || 'Failed to fetch resale requests';
                setErrorMessage(message);
            }
        };

        fetchResales();
    }, [vendorId]);

    return (
        <div>
            <Nav/><br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 align="center"><u>Resale Requests</u></h1>
            {errorMessage && <p>{errorMessage}</p>}
            {resales.length === 0 ? (
                <p>No resale requests found.</p>
            ) : (
                <div>
                    {resales.map((resale) => (
                        <div key={resale._id} style={cardStyle}>
                            <h3>Product: {resale.product.name}</h3>
                            <p><strong>User:</strong> {resale.user.name}</p>
                            <p><strong>Address:</strong> {resale.user.address}</p>
                            <p><strong>Phone:</strong> {resale.user.phno}</p>
                            <p><strong>Dead Chicks Count:</strong> {resale.deadChicksCount}</p>
                            <p><strong>Total Weight:</strong> {resale.totalWeight} kg</p>
                            <p><strong>Pickup Date:</strong> {new Date(resale.pickupDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Inline CSS for card style
const cardStyle = {
    border: '5px solid blue',
    borderRadius: '5px',  // Reduced border radius
    padding: '10px',      // Reduced padding
    margin: '10px 0',
    width: '200px',       // Set a fixed width for the card
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)', // Reduced shadow
};

export default ViewResale;
