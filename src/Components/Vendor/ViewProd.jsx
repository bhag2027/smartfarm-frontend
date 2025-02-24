
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav'; // Import the Nav component

const ViewProd = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editableProductId, setEditableProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [imageFile, setImageFile] = useState(null); // State for image file

  const vendorId = sessionStorage.getItem('vendorId');

  const styles = {
    container: {
      padding: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: '#f0f0f0',
    },
    th: {
      backgroundColor: 'lightblue',
      padding: '12px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    td: {
      padding: '15px',
      border: '4px solid #ddd',
      backgroundColor: '#ffffff',
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
    },
    button: {
      marginRight: '5px',
      padding: '8px 12px',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
    },
    deleteButton: {
      backgroundColor: '#f44336',
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/viewproducts?vendorId=${vendorId}`);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    };

    if (vendorId) {
      fetchProducts();
    } else {
      setError('Vendor ID not found. Please log in as a vendor.');
    }
  }, [vendorId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!products.length) {
    return <p>No products available</p>;
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3030/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Error deleting product');
      }
    }
  };

  const handleEditClick = (product) => {
    setEditableProductId(product._id);
    setUpdatedProduct({
      name: product.name,
      price: product.price,
      stock: '', // Reset for input
      description: product.description,
    });
    setImageFile(null); // Reset image file on edit
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the image file
  };

  const handleUpdate = async (productId) => {
    const productToUpdate = products.find(product => product._id === productId);
    const newStock = parseInt(updatedProduct.stock, 10) || 0;

    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile); // Append image file only if it exists
    }
    formData.append('name', updatedProduct.name);
    formData.append('price', updatedProduct.price);
    formData.append('stock', productToUpdate.stock + newStock); 
    formData.append('description', updatedProduct.description);

    try {
      // Send the update request and await the response
      const response = await axios.put(`http://localhost:3030/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the response contains the updated product details
      const updatedProductData = response.data.product; // Adjust based on your actual response structure

      // Update the products state with the new product data
      setProducts(products.map(product => 
        product._id === productId ? updatedProductData : product
      ));

      // Reset editable states
      setEditableProductId(null);
      setUpdatedProduct({});
      setImageFile(null); // Reset image file
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product');
    }
  };

  return (
    <div style={styles.container}>
      <Nav /><br></br>
      <br></br>
      <br></br>
      <h1 align="center"><u>View Products</u></h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Product Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Vendor Name</th>
            <th style={styles.th}>Image</th> {/* New column for image */}
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={styles.td}>
                {editableProductId === product._id ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td style={styles.td}>
                {editableProductId === product._id ? (
                  <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <span>
      ₹{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price).replace('₹', '')}
    </span>

                )}
              </td>
              <td style={styles.td}>
                {editableProductId === product._id ? (
                  <input
                    type="number"
                    name="stock"
                    placeholder="Enter new quantity"
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td style={styles.td}>
                {editableProductId === product._id ? (
                  <input
                    type="text"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td style={styles.td}>{product.vendorId ? product.vendorId.v_name : 'N/A'}</td>
              <td style={styles.td}>
                {editableProductId === product._id ? (
                  <>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      style={styles.input}
                    />
                    {imageFile && <p>Selected file: {imageFile.name}</p>} {/* Show selected file name */}
                  </>
                ) : (
                  <img src={`http://localhost:3030/${product.image}`} alt={product.name} style={{ width: '90px', height: '90px' }} />
                )}
              </td>
              <td style={styles.td}>
                {editableProductId === product._id ? (
                  <button 
                    onClick={() => handleUpdate(product._id)} 
                    style={styles.button}
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEditClick(product)} 
                    style={styles.button}
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(product._id)} 
                  style={{ ...styles.button, ...styles.deleteButton }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProd;
