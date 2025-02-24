
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Nav from './Nav';  // Ensure the Nav component is imported

// const AddProducts = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [stock, setStock] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Get the vendor's ID and name from sessionStorage
//   const vendorId = sessionStorage.getItem('vendorId');
//   const v_name = sessionStorage.getItem('v_name');

//   // Check if vendor is logged in
//   useEffect(() => {
//     if (!vendorId || !v_name) {
//       setMessage('Please log in as a vendor to add products.');
//     }
//   }, [vendorId, v_name]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!vendorId) {
//       setMessage("Vendor ID is missing. Please log in again.");
//       setIsLoading(false);
//       return;
//     }

//     if (price <= 0 || stock <= 0) {
//       setMessage("Price and stock must be greater than 0.");
//       setIsLoading(false);
//       return;
//     }

//     const productData = {
//       name,
//       price,
//       stock,
//       description,
//       vendorId,
//       v_name,
//     };

//     try {
//       const res = await axios.post('http://localhost:3030/add-product', productData);
//       if (res.data.success) {
//         setMessage(res.data.message || 'Product added successfully');
//         setName('');
//         setPrice('');
//         setStock('');
//         setDescription('');
//       } else {
//         setMessage(res.data.message || 'Failed to add product');
//       }
//     } catch (err) {
//       console.error('Error adding product:', err);
//       setMessage('Error adding product');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Nav />
      
//       <h1 align="center"><u>Add a New Product</u></h1>
//       {message && <p>{message}</p>}
//       {isLoading && <p>Loading...</p>}

//       <form onSubmit={handleSubmit}>
//         <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
//           <tbody>
//             <tr>
//               <td><label>Product Name</label></td>
//               <td>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   style={inputStyle}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td><label>Price</label></td>
//               <td>
//                 <input
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   style={inputStyle}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td><label>Stock</label></td>
//               <td>
//                 <input
//                   type="number"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                   required
//                   style={inputStyle}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td><label>Description</label></td>
//               <td>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   style={textareaStyle}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="2" style={{ textAlign: 'center' }}>
//                 <button type="submit" style={buttonStyle} disabled={isLoading}>Add Product</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
// };

// // Styles for inputs, buttons, etc.
// const inputStyle = {
//   width: '100%',
//   padding: '8px',
//   borderRadius: '4px',
//   border: '1px solid #ddd',
// };

// const textareaStyle = {
//   width: '100%',
//   padding: '8px',
//   borderRadius: '4px',
//   border: '1px solid #ddd',
//   height: '100px',
// };

// const buttonStyle = {
//   padding: '10px 15px',
//   border: 'none',
//   borderRadius: '4px',
//   backgroundColor: '#4CAF50',
//   color: '#fff',
//   fontSize: '16px',
//   cursor: 'pointer',
// };

// export default AddProducts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import farm4 from '../../assets/farm4.jpeg';
const AddProducts = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State for image
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const vendorId = sessionStorage.getItem('vendorId');
  const v_name = sessionStorage.getItem('v_name');

  useEffect(() => {
    if (!vendorId || !v_name) {
      setMessage('Please log in as a vendor to add products.');
    }
  }, [vendorId, v_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!vendorId) {
      setMessage("Vendor ID is missing. Please log in again.");
      setIsLoading(false);
      return;
    }

    if (price <= 0 || stock <= 0) {
      setMessage("Price and stock must be greater than 0.");
      setIsLoading(false);
      return;
    }

    const productData = new FormData();
    productData.append('name', name);
    productData.append('price', price);
    productData.append('stock', stock);
    productData.append('description', description);
    productData.append('vendorId', vendorId);
    productData.append('v_name', v_name);
    if (image) {
      productData.append('image', image); // Append image to form data
    }

    try {
      const res = await axios.post('http://localhost:3030/add-product', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) {
        setMessage(res.data.message || 'Product added successfully');
        setName('');
        setPrice('');
        setStock('');
        setDescription('');
        setImage(null); // Reset image
      } else {
        setMessage(res.data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setMessage('Error adding product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundImage: `url(${farm4})`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff' // Optional: Set font color to contrast with the background
      }}
    >
      <Nav />
     <br></br> <br></br>
     <br></br>
      <h1 align="center" style={{ color: 'black' }}><u>Add a New Product</u></h1>

      {message && <p>{message}</p>}
      {isLoading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
            <td><label style={{ color: 'black' }}>Product Name</label></td>

              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </td>
            </tr>
            <tr>
              <td><label style={{ color: 'black' }}>Price</label></td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  style={inputStyle}
                />
              </td>
            </tr>
            <tr>
              <td><label style={{ color: 'black' }}>Stock</label></td>
              <td>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  style={inputStyle}
                />
              </td>
            </tr>
            <tr>
              <td><label style={{ color: 'black' }}>Description</label></td>
              <td>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={textareaStyle}
                />
              </td>
            </tr>
            <tr>
              <td><label style={{ color: 'black' }}>Product Image</label></td>
              <td>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*" // Accept image files
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button type="submit" style={buttonStyle} disabled={isLoading}>Add Product</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

// Styles for inputs, buttons, etc.
const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const textareaStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  height: '100px',
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
};

export default AddProducts;
