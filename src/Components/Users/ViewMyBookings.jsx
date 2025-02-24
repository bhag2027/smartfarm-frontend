import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavUser from './NavUser';

const ViewMyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = sessionStorage.getItem('userId');
            console.log(`User ID from session storage: ${userId}`);

            if (!userId) {
                setMessage('User is not logged in. Please log in to view bookings.');
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:3030/user-bookings/${userId}`);
                console.log('API Response:', res.data);

                if (res.data.success) {
                    setBookings(res.data.bookings);
                    console.log('Bookings fetched:', res.data.bookings);
                } else {
                    setMessage(res.data.message || 'No bookings found');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setMessage('Error fetching bookings. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleReturn = (bookingId) => {
        navigate(`/return-booking/${bookingId}`); // Navigate to return page with booking ID
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <NavUser /><br></br>
            <br></br>
            <h1 align="center"><u>My Orders</u></h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}

            {bookings.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Vendor Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booking Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.product.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.vendor.v_name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.quantity}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {booking.status === 'accepted' ? (
                                        <span style={{ color: 'green' }}>Accepted</span>
                                    ) : booking.status === 'rejected' ? (
                                        <span style={{ color: 'red' }}>Rejected</span>
                                    ) : booking.status === 'returned' ? (
                                        <span style={{ color: 'purple' }}>Returned</span>
                                    ) : (
                                        <span style={{ color: 'orange' }}>Pending</span>
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button 
                                        onClick={() => handleReturn(booking._id)} 
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '8px 12px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Return
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings available.</p>
            )}
        </div>
    );
};

export default ViewMyBookings;
