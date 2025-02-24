import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavUser from './NavUser';



const ReturnBooking = () => {
    const { bookingId } = useParams(); // Get booking ID from URL params
    const [returnReason, setReturnReason] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = sessionStorage.getItem('userId'); // Assuming you store the user ID in session storage
        
        if (!userId) {
            setMessage('User is not logged in. Please log in to submit a return.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3030/submit-return', {
                bookingId,
                returnReason,
                userId
            });
            console.log('Response from server:', response.data); // Log the response to check

            if (response.data.success) {
                setMessage('Return request submitted successfully!');
                setTimeout(() => {
                    navigate("/view-my-bookings"); // Redirect to bookings page
                }, 2000);
            } else {
                setMessage(response.data.message || 'Failed to submit return request.');
            }
        } catch (error) {
            console.error('Error submitting return:', error);
            setMessage('Failed to submit return request. Please try again.');
        }
    };

    return (
        <div>
            <NavUser/><br></br>
            <br></br>
            <br></br>
            <br></br><h2 align="center"><u>Submit Return Request</u></h2>
            <div 
    className="card" 
    style={{ 
        padding: '20px', 
        margin: '20px auto',
        maxWidth: '600px', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        border: '5px solid black', // Adding a light gray border
        borderRadius: '8px' // Keeping the rounded corners
    }}
>
    <h2>Enter Reason......</h2>
    {message && <p style={{ color: 'red' }}>{message}</p>}
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="returnReason">Reason for Return:</label>
            <textarea
                id="returnReason"
                className="form-control"
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="btn btn-primary">Submit Return</button>
    </form>
</div>

        </div>
    );
};

export default ReturnBooking;
