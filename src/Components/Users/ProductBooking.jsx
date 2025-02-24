

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import NavUser from './NavUser';

// const ProductBooking = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [bookingDate, setBookingDate] = useState('');
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [isBooking, setIsBooking] = useState(false); // Track booking state
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:3030/products/${productId}`);
//                 if (res.data.success) {
//                     setProduct(res.data.product);
//                     setBookingDate(new Date().toISOString().split("T")[0]); // Set default booking date to today
//                 } else {
//                     setMessage('Product not found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//                 setMessage('Error fetching product details');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [productId]);

//     const handleBooking = async (e) => {
//         e.preventDefault();
//         const userId = sessionStorage.getItem('userId');

//         if (!userId) {
//             setMessage('User is not logged in. Please log in to book a product.');
//             return;
//         }
//         if (quantity > product.stock) {
//             setMessage('Not enough stock available. Please reduce the quantity.');
//             return;
//         }


//         setIsBooking(true); // Disable button during booking

//         try {
//             const res = await axios.post('http://localhost:3030/book-product', {
//                 productId,
//                 quantity: Number(quantity),
//                 userId,
//                 bookingDate
//             });
//             if (res.data.success) {
//                 setMessage('Product booked successfully!');
//                 setTimeout(() => {
//                     navigate('/view-products');
//                 }, 2000);
//             } else {
//                 setMessage(res.data.message || 'Failed to book product');
//             }
//         } catch (error) {
//             console.error('Error booking product:', error);
//             setMessage('Error booking product');
//         } finally {
//             setIsBooking(false); // Re-enable button after booking
//         }
//     };

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     if (!product) {
//         return <p>{message}</p>;
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             <NavUser />
//             <h1 align="center"><u>Booking Product</u></h1>
//             {message && <p style={{ color: 'red' }}>{message}</p>}

//             <div style={{
//                 maxWidth: '500px',
//                 margin: '20px auto',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                 backgroundColor: '#fff',
//             }}>
//                 <form onSubmit={handleBooking}>
//                     <h2>{product.name}</h2>
//                     <p>Price: ₹{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price).replace('₹', '')}</p>

//                     <p>Available Stock: {product.stock}</p>
//                     <div>
//                         <label style={{ display: 'block', marginBottom: '8px' }}>Quantity:</label>
//                         <input
//                             type="number"
//                             value={quantity}
//                             onChange={(e) => {
//                                 const value = Math.max(1, Math.min(Number(e.target.value), product.stock));
//                                 setQuantity(value);
//                             }}
//                             min="1"
//                             max={product.stock}
//                             required
//                             style={{
//                                 width: '100%',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 border: '1px solid #ccc',
//                                 marginBottom: '10px'
//                             }}
//                         />
//                     </div>
//                     <div>
//                         <label style={{ display: 'block', marginBottom: '8px' }}>Booking Date:</label>
//                         <input
//                             type="date"
//                             value={bookingDate}
//                             onChange={(e) => setBookingDate(e.target.value)}
//                             required
//                             style={{
//                                 width: '100%',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 border: '1px solid #ccc',
//                                 marginBottom: '10px'
//                             }}
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         style={{
//                             backgroundColor: product.stock === 0 ? 'gray' : '#007BFF', // Change button color when stock is empty
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             padding: '10px 15px',
//                             cursor: 'pointer',
//                             width: '100%'
//                         }}
//                         disabled={isBooking || product.stock === 0} // Disable button if booking is in progress or stock is zero
//                     >
//                         {isBooking ? 'Booking...' : (product.stock === 0 ? 'Out of Stock' : 'Confirm Booking')}
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProductBooking;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavUser from './NavUser';

const ProductBooking = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [bookingDate, setBookingDate] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false); // Track booking state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3030/products/${productId}`);
                if (res.data.success) {
                    setProduct(res.data.product);
                    setBookingDate(new Date().toISOString().split("T")[0]); // Set default booking date to today
                } else {
                    setMessage('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setMessage('Error fetching product details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleBooking = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            setMessage('User is not logged in. Please log in to book a product.');
            return;
        }

        if (quantity > product.stock) {
            setMessage('Not enough stock available. Please reduce the quantity.');
            return;
        }

        setIsBooking(true); // Disable button during booking

        try {
            const res = await axios.post('http://localhost:3030/book-product', {
                productId,
                quantity: Number(quantity),
                userId,
                bookingDate
            });
            if (res.data.success) {
                setMessage('Product booked successfully!');
                setTimeout(() => {
                    navigate('/view-products');
                }, 2000);
            } else {
                setMessage(res.data.message || 'Failed to book product');
            }
        } catch (error) {
            console.error('Error booking product:', error);
            setMessage('Error booking product');
        } finally {
            setIsBooking(false); // Re-enable button after booking
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>{message}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <NavUser />
            <h1 align="center"><u>Booking Product</u></h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}

            <div style={{
                maxWidth: '500px',
                margin: '20px auto',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}>
                <form onSubmit={handleBooking}>
                    <h2>{product.name}</h2>
                    <p>Price: ₹{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price).replace('₹', '')}</p>

                    <p>Available Stock: {product.stock}</p>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                const value = Number(e.target.value); 
                                setQuantity(value); 
                            }}
                            min="1"
                            required
                            
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '10px'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Booking Date:</label>
                        <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '10px'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: product.stock === 0 ? 'gray' : '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 15px',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                        disabled={isBooking || product.stock === 0}
                    >
                        {isBooking ? 'Booking...' : (product.stock === 0 ? 'Out of Stock' : 'Confirm Booking')}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ProductBooking;
