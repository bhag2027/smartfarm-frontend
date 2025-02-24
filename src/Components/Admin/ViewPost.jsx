import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdNav from './AdNav';

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get token from session storage
        const response = await axios.get('http://localhost:3030/admin/posts/view-admin-posts', {
          headers: {
            token, // Pass the token in the header for authentication
          },
        });
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

  // Function to handle deleting a post
  const deletePost = async (postId) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3030/admin/posts/delete-post/${postId}`, {
        headers: {
          token,
        },
      });
      // Update state to remove the deleted post
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      setError('Failed to delete post.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}> {/* Align items to the right */}
        <AdNav/>
      <div style={{ width: '80%', marginLeft: '20px' }}> {/* Ensure there's space for the sidebar */}
        <h1 align="center"><u>Posts</u></h1>
        {posts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {posts.map((post) => (
              <div key={post._id} style={{ border: '1px solid #ddd', padding: '10px' }}>
                <h3>{post.message}</h3>
                {post.image && <img src={`http://localhost:3030/${post.image}`} alt="Post" style={{ width: '50%' }} />}
                <p>
                  Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date not available'}
                </p>
                <button onClick={() => deletePost(post._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
