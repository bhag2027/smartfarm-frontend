

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import NavUser from './NavUser';

// const ViewProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get('http://localhost:3030/products');
//                 console.log(res.data.products); // Log the products to check image URLs
//                 if (res.data.success) {
//                     setProducts(res.data.products);
//                 } else {
//                     setErrorMessage('Failed to fetch products');
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//                 setErrorMessage('Error fetching products');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const updateProductStock = (productId, bookedQuantity) => {
//         setProducts(prevProducts =>
//             prevProducts.map(product =>
//                 product._id === productId
//                     ? { ...product, stock: product.stock - bookedQuantity }
//                     : product
//             )
//         );
//     };

//     useEffect(() => {
//         if (location.state) {
//             const { productId, quantity } = location.state;
//             updateProductStock(productId, quantity);
//         }
//     }, [location.state]);

//     const handleBookClick = (productId) => {
//         navigate(`/booking/${productId}`);
//     };

//     if (isLoading) {
//         return <p>Loading products...</p>;
//     }

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <NavUser /><br /><br />
//             <h1 align="center"><u>Available Products</u></h1>
//             {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

//             <table style={{
//                 margin: '10px auto',
//                 borderCollapse: 'collapse',
//                 width: '80%',
//                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//                 borderRadius: '5px',
//                 overflow: 'hidden',
//                 border: '1px solid #ddd'
//             }}>
//                 <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
//                     <tr>

//                         <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Product Name</th>
//                         <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Price</th>
//                         <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Stock</th>
//                         <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
//                         <th style={{ padding: '10px', border: '1px solid #ddd' }}>Vendor Name</th>
//                         <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Image</th>
//                         <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.length > 0 ? (
//                         products.map((product) => (
//                             <tr key={product._id} style={{ borderBottom: '1px solid #ddd' }}>

//                                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
//                                 {/* <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>${product.price}</td> */}
//                                 <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>
//                                     ₹{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price).replace('₹', '')}
//                                 </td>

//                                 <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>
//                                     {product.stock > 0 ? product.stock : 'Out of Stock'}
//                                 </td>
//                                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.description}</td>
//                                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.vendorName}</td> {/* Use vendorName */}
//                                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>
//                                     <img src={`http://localhost:3030/${product.image}`} alt={product.name} style={{ width: '90px', height: '90px' }} />
//                                 </td>
//                                 <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>
//                                     <button
//                                         onClick={() => handleBookClick(product._id)}
//                                         style={{
//                                             backgroundColor: product.stock > 0 ? '#28a745' : '#ccc',
//                                             color: 'white',
//                                             border: '1px solid white',
//                                             borderRadius: '4px',
//                                             padding: '8px 12px',
//                                             cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
//                                         }}
//                                         disabled={product.stock === 0}
//                                     >
//                                         {product.stock > 0 ? 'Book' : 'Out of Stock'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No products available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewProducts;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import NavUser from './NavUser';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3030/products');
                console.log(res.data.products);
                if (res.data.success) {
                    setProducts(res.data.products);
                } else {
                    setErrorMessage('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setErrorMessage('Error fetching products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const updateProductStock = (productId, bookedQuantity) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === productId
                    ? { ...product, stock: product.stock - bookedQuantity }
                    : product
            )
        );
    };

    useEffect(() => {
        if (location.state) {
            const { productId, quantity } = location.state;
            updateProductStock(productId, quantity);
        }
    }, [location.state]);

    const handleBookClick = (productId) => {
        navigate(`/booking/${productId}`);
    };

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <NavUser /><br /><br />
            <h1 align="center"><u>Available Products</u></h1>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                padding: '20px'
            }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '16px',
                            backgroundColor: '#fff',
                            textAlign: 'center'
                        }}>
                            <img src={`http://localhost:3030/${product.image}`} alt={product.name}
                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                            <h3>{product.name}</h3>
                            <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                                ₹{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price).replace('₹', '')}
                            </p>
                            <p>{product.description}</p>
                            <p>Vendor: {product.vendorName}</p>
                            <p>Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>

                            <button
                                onClick={() => handleBookClick(product._id)}
                                style={{
                                    backgroundColor: product.stock > 0 ? '#28a745' : '#ccc',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '10px',
                                    cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                                    width: '100%',
                                    marginTop: '10px'
                                }}
                                disabled={product.stock === 0}
                            >
                                {product.stock > 0 ? 'Book' : 'Out of Stock'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', padding: '30px' }}>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ViewProducts;
