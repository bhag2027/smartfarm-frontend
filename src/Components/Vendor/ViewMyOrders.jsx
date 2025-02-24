// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Nav from './Nav';

// const ViewMyOrders = () => {
//     const [bookings, setBookings] = useState([]);
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             const vendorId = sessionStorage.getItem('vendorId');
//             console.log(`Vendor ID from session storage: ${vendorId}`);

//             if (!vendorId) {
//                 setMessage('Vendor is not logged in. Please log in to view bookings.');
//                 setIsLoading(false);
//                 return;
//             }

//             try {
//                 const res = await axios.get(`http://localhost:3030/api/vendor-bookings/${vendorId}`);
//                 console.log('API Response:', res.data);

//                 if (res.data.success) {
//                     setBookings(res.data.bookings);
//                 } else {
//                     setMessage(res.data.message || 'No bookings found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching bookings:', error.response || error);
//                 setMessage('Error fetching bookings. Please try again later.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     const handleResponse = async (bookingId, isAccepted) => {
//         try {
//             const response = await axios.post(`http://localhost:3030/api/update-booking/${bookingId}`, { isAccepted });
//             setMessage(response.data.message);

//             // Update bookings without removing the row
//             setBookings(prevBookings => 
//                 prevBookings.map(booking => 
//                     booking._id === bookingId ? { ...booking, status: isAccepted ? 'accepted' : 'rejected' } : booking
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating booking:', error);
//             setMessage('Error updating booking. Please try again later.');
//         }
//     };

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <Nav/><br/>
//             <br></br>
//             <h1 align="center"><u>Received Orders</u></h1>
//             {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

//             {bookings.length > 0 ? (
//                 <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Product Name</th>
//                             <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>User Name</th>
//                             <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Quantity</th>
//                             <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Booking Date</th>
//                             <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Status</th>
//                             <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking) => (
//                             <tr key={booking._id}>
//                                 <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.product.name}</td>
//                                 <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.user.name}</td>
//                                 <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.quantity}</td>
//                                 <td style={{ border: '5px solid #ddd', padding: '8px' }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
//                                 <td style={{ border: '5px solid #ddd', padding: '8px' }}>
//                                     {booking.status === 'accepted' ? (
//                                         <span style={{ color: 'green' }}>Accepted</span>
//                                     ) : booking.status === 'rejected' ? (
//                                         <span style={{ color: 'red' }}>Rejected</span>
//                                     ) : (
//                                         <span style={{ color: 'orange' }}>Pending</span>
//                                     )}
//                                 </td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                     <button 
//                                         onClick={() => handleResponse(booking._id, true)} 
//                                         style={{ marginRight: '5px', backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
//                                     >
//                                         Accept
//                                     </button>
//                                     <button 
//                                         onClick={() => handleResponse(booking._id, false)} 
//                                         style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
//                                     >
//                                         Reject
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No bookings available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewMyOrders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const ViewMyOrders = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const vendorId = sessionStorage.getItem('vendorId');
            console.log(`Vendor ID from session storage: ${vendorId}`);

            if (!vendorId) {
                setMessage('Vendor is not logged in. Please log in to view bookings.');
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:3030/api/vendor-bookings/${vendorId}`);
                console.log('API Response:', res.data);

                if (res.data.success) {
                    setBookings(res.data.bookings);
                } else {
                    setMessage(res.data.message || 'No bookings found');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error.response || error);
                setMessage('Error fetching bookings. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleResponse = async (bookingId, isAccepted) => {
        try {
            const response = await axios.post(`http://localhost:3030/api/update-booking/${bookingId}`, { isAccepted });
            setMessage(response.data.message);

            // Update bookings without removing the row
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking._id === bookingId ? { ...booking, status: isAccepted ? 'accepted' : 'rejected' } : booking
                )
            );
        } catch (error) {
            console.error('Error updating booking:', error);
            setMessage('Error updating booking. Please try again later.');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Nav/><br/>
            <br></br>
            <br></br>
            <h1 align="center"><u>Received Orders</u></h1>
            {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

            {bookings.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Product Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>User Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>User Phone</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>User Address</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Quantity</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Booked Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Status</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.product.name}</td>
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.user.name}</td>
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.user.phno}</td> {/* User Phone */}
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.user.address}</td> {/* User Address */}
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>{booking.quantity}</td>
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td style={{ border: '5px solid #ddd', padding: '8px' }}>
                                    {booking.status === 'accepted' ? (
                                        <span style={{ color: 'green' }}>Accepted</span>
                                    ) : booking.status === 'rejected' ? (
                                        <span style={{ color: 'red' }}>Rejected</span>
                                    ) : (
                                        <span style={{ color: 'orange' }}>Pending</span>
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button 
                                        onClick={() => handleResponse(booking._id, true)} 
                                        style={{ marginRight: '5px', backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleResponse(booking._id, false)} 
                                        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
                                    >
                                        Reject
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

export default ViewMyOrders;
