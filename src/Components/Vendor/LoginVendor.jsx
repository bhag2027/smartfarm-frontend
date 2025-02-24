import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chick1 from '../../assets/chick1.jpg';

const LoginVendor = () => {
  const [data, setData] = useState({
    v_email: "",
    v_password: ""
  });

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    axios.post("http://localhost:3030/vendorsignin", data)
      .then((response) => {
        if (response.data.status === "success") {
          // Store token and vendor info in sessionStorage
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("vendorId", response.data.vendorId);  // Corrected vendorId
          sessionStorage.setItem("v_name", response.data.v_name);

          // Redirect to the vendor dashboard
          navigate("/Vendordashboard");
        } else {
          alert(response.data.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert("invalid emailid or password");
      });
  };

  let navigate = useNavigate();

  // Inline styles for background image
  const styles = {
    container: {
      backgroundImage: `url(${chick1})`,// Update with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Full height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      maxWidth: '500px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: white background with transparency
      borderRadius: '8px',
      padding: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <div className="card" style={styles.card}>
        <h1 className="text-center text-dark"><u>Login</u></h1><br />
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="v_email" className="form-label"><b>Email</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="v_email"
                  value={data.v_email}
                  onChange={inputHandler}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="v_password" className="form-label"><b>Password</b></label>
                <input
                  type="password"
                  className="form-control"
                  name="v_password"
                  value={data.v_password}
                  onChange={inputHandler}
                  placeholder="Enter your password"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-success btn-block" onClick={readValue}>
                  LOGIN
                </button>
              </div>
              <div className="text-center">
                <p className="text-dark">
                  New users click to Signup <Link to="/Vendoradd">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginVendor;
