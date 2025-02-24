import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavUser from './NavUser';

const ResaleForm = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state.product; // Access the product details from navigation state

    const [deadChicksCount, setDeadChicksCount] = useState('');
    const [totalWeight, setTotalWeight] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem('userId');

        try {
            // Submit resale details to the backend
            const response = await axios.post('http://localhost:3030/submit-resale', {
                bookingId: product._id,
                userId,
                deadChicksCount,
                totalWeight,
                pickupDate
            });

            if (response.data.success) {
                setMessage('Resale request submitted successfully!');
                setTimeout(() => {
                    navigate("/search-booked-products"); // Redirect after success
                }, 2000);
            } else {
                setMessage(response.data.message || 'Failed to submit resale request.');
            }
        } catch (error) {
            console.error('Error submitting resale:', error);
            setMessage('Failed to submit resale request. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
          <NavUser/>
            <div style={styles.card}>
                <h2>Resale Form for {product.product.name}</h2>
                {message && <p style={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label>Dead Chicks Count:</label>
                        <input
                            type="number"
                            value={deadChicksCount}
                            onChange={(e) => setDeadChicksCount(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Total Weight (in kg):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={totalWeight}
                            onChange={(e) => setTotalWeight(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Pickup Date:</label>
                        <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

// Styles for the card and other elements
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9', // Optional background color
    },
    card: {
        border: '4px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        width: '700px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff', // Card background color
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    submitButton: {
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    message: {
        color: 'red',
    },
};

export default ResaleForm;
