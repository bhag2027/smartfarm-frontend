import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import AdNav from './AdNav';

const AdminCreatePost = () => {
    const [message, setMessage] = useState("");  // For the post message
    const [image, setImage] = useState(null);    // For the uploaded image
    const token = sessionStorage.getItem("token"); // Get token from session storage

    // Function to handle image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Save the selected image file
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("message", message);  // Keep the field name as 'message'
        formData.append("image", image);      // Attach the image file

        try {
            const response = await axios.post("http://localhost:3030/admin/posts/create-daily-rate", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": token,  // Send the admin's token for authentication
                },
            });

            if (response.data.status === "Success") {
                alert("Post created successfully!");
                setMessage("");  // Clear the message after successful submission
                setImage(null);  // Clear the image selection
            } else {
                alert("Failed to create post.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Inline styles
    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '10px solid #grey',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'light grey',
        padding: '10px',
        color: 'white',
        marginBottom: '20px',
    };

    const linkStyle = {
        color: 'lightgrey',
        textDecoration: 'none',
        fontWeight: 'bold',
    };

    return (
        <div className="container mt-5">
            <AdNav/><br></br>
            <br></br>

            <div style={containerStyle}>
                <h2 align="center"><u>Create Daily Rate Post</u></h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} 
                            placeholder="Enter the daily rate message" 
                            required
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        />
                    </div>
                    <div>
                        <input 
                            type="file"
                            onChange={handleImageChange} 
                            accept="image/*"
                            required
                            style={{ marginBottom: '10px' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white', fontSize: '16px' }}>
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminCreatePost;
