import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chick1 from '../../assets/chick1.jpg';
import NavBar from '../Navbar/NavBar';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle login submission
  const readValue = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous error messages

    try {
      const response = await axios.post("http://localhost:3030/login", data); // Update URL as needed

      if (response.data.status === "success") {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("role", response.data.role);

        // Redirect based on the role
        if (response.data.role === 'admin') {
          navigate('/admindashboard');
        } else if (response.data.role === 'user') {
          navigate('/userdashboard');
        } else if (response.data.role === 'vendor') {
          navigate('/vendordashboard');
        } else {
          alert("Invalid role");
        }
      } else if (response.data.status === "invalid_email") {
        setError("Invalid email. Please check and try again.");
      } else if (response.data.status === "invalid_password") {
        setError("Invalid password. Please try again.");
      } else {
        alert(response.data.message); // Use the error message from the response
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login: " + (error.response?.data.message || error.message)); // Set error message
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${chick1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
      <NavBar />
      <div className="login-page">
        <div className="container">
          <h1 className="text-center text-light"><u>Login</u></h1><br />
          <div className="card mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body">
              {error && <p className="error text-danger">{error}</p>} {/* Display error message */}
              <form onSubmit={readValue}> {/* Use readValue to handle form submission */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"><b>Email</b></label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={data.email}
                    onChange={inputHandler}
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label"><b>Password</b></label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={data.password}
                    onChange={inputHandler}
                    placeholder="Enter your password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3 text-center">
                  <button className="btn btn-success" type="submit" style={{ width: '40%', padding: '10px', fontSize: '16px' }}>
                    LOGIN
                  </button>
                </div>
              </form>
              <div className="text-light">
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'black' }}>Already Account?</span>
                <Link to="/reg">
                  <button className="btn btn-primary ml-2" style={{ width: '20%', padding: '8px', fontSize: '8px' }}>Sign Up</button>
                </Link>
              </div><br></br>
              <div className="text-light">
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'black' }}>Vendor Login</span>

                
                <Link to="/vendorlogin">
                  <button className="btn btn-primary ml-2" style={{ width: '20%', padding: '8px', fontSize: '8px' }}>Click</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
