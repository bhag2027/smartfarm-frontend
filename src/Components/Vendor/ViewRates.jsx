// src/components/VendorRates.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const ViewRates = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3030/vendor/posts/view'); // Endpoint for vendors
        setPosts(response.data.posts); // Set posts on success
        setError(''); // Clear any previous errors
      } catch (err) {
        // Check if there's a response and set a meaningful error message
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error fetching posts from server.');
        } else {
          setError('Network error or server is down.');
        }
      } finally {
        setLoading(false); // Always set loading to false
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
        <Nav/><br></br>
        <br></br>
        <br></br>
      <h1 align="center"><u> Rates</u></h1>
      {posts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {posts.map((post) => (
            <div key={post._id} style={{ border: '1px solid #ddd', padding: '10px' }}>
              <h3>{post.message}</h3>
              {post.image && <img src={`http://localhost:3030/${post.image}`} alt="Post" style={{ width: '50%' }} />}
              <p>
                Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date not available'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default ViewRates;
