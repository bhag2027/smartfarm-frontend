import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const ViewMyReturns = () => {
    const [returns, setReturns] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReturns = async () => {
            const vendorId = sessionStorage.getItem('vendorId');
            console.log(`Vendor ID from session storage: ${vendorId}`);

            if (!vendorId) {
                setMessage('Vendor is not logged in. Please log in to view returns.');
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:3030/returns/${vendorId}`);
                console.log('API Response:', res.data);

                if (res.data && res.data.length > 0) {
                    setReturns(res.data);
                } else {
                    setMessage('No returns found for your products.');
                }
            } catch (error) {
                console.error('Error fetching returns:', error.response || error);
                setMessage('Error fetching return requests. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReturns();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Nav /><br />
            <br></br>
            <br></br>
            <h1 align="center"><u>Returned Products</u></h1>
            {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

            {returns.length > 0 ? (
                <div style={styles.cardContainer}>
                    {returns.map((ret) => (
                        <div key={ret._id} style={styles.card}>
                            <h3 style={styles.productName}>{ret.product_id.name}</h3>
                            <p><strong>User Name:</strong> {ret.user_id.name}</p>
                            <p><strong>User Phone:</strong> {ret.user_id.phno}</p>
                            <p><strong>Return Reason:</strong> {ret.return_reason}</p>
                            <p><strong>Return Date:</strong> {new Date(ret.return_date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No returns available.</p>
            )}
        </div>
    );
};

// Styles for card layout
const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px',
    },
    card: {
        border: '5px solid black',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px',
        width: '300px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: 'lightpink',
    },
    productName: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    }
};

export default ViewMyReturns;
