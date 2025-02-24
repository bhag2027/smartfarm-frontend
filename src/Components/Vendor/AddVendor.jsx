import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chick3 from '../../assets/chick3.jpg'; // Update the path to your background image

const AddVendor = () => {
    const [data, changeData] = useState({
        v_name: "",
        v_phno: "",
        v_address: "",
        v_place: "",
        v_email: "",
        v_password: "",
        confirmpassword: ""
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors

    const inputHandler = (event) => {
        changeData({ ...data, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" }); // Clear error on input change
    }

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        const phoneRegex = /^[0-9]{10}$/; // Phone number should be 10 digits

        if (!data.v_name) newErrors.v_name = "Name is required";
        if (!data.v_phno) {
            newErrors.v_phno = "Phone number is required";
        } else if (!phoneRegex.test(data.v_phno)) {
            newErrors.v_phno = "Phone number must be 10 digits";
        }
        if (!data.v_address) newErrors.v_address = "Address is required";
        if (!data.v_place) newErrors.v_place = "Place is required";
        if (!data.v_email) {
            newErrors.v_email = "Email is required";
        } else if (!emailRegex.test(data.v_email)) {
            newErrors.v_email = "Invalid email format";
        }
        if (!data.v_password) newErrors.v_password = "Password is required";
        if (!data.confirmpassword) {
            newErrors.confirmpassword = "Please confirm your password";
        } else if (data.v_password !== data.confirmpassword) {
            newErrors.confirmpassword = "Passwords do not match";
        }

        return newErrors; // Return errors object
    }

    const readValue = () => {
        const validationErrors = validate(); // Validate on form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set validation errors
            return; // Prevent submission
        }

        console.log(data);
        axios.post("http://localhost:3030/vendorsignup", data).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully added");
                } else {
                    alert("Failed to add vendor");
                }
            }
        ).catch((error) => {
            console.error("Error during registration:", error);
            alert("An error occurred while adding the vendor.");
        });
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${chick3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="card" style={{
                width: '500px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)' // Semi-transparent background for the card
            }}>
                <h1 align="center"><u>SIGN UP</u></h1><br />
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="col-12">
                                    <div className="row g-3">
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='v_name'
                                                value={data.v_name}
                                                onChange={inputHandler}
                                                placeholder="Enter your name"
                                            />
                                            {errors.v_name && <p style={{ color: 'red' }}>{errors.v_name}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Phone number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='v_phno'
                                                value={data.v_phno}
                                                onChange={inputHandler}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.v_phno && <p style={{ color: 'red' }}>{errors.v_phno}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='v_address'
                                                value={data.v_address}
                                                onChange={inputHandler}
                                                placeholder="Enter your address"
                                            />
                                            {errors.v_address && <p style={{ color: 'red' }}>{errors.v_address}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Place</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='v_place'
                                                value={data.v_place}
                                                onChange={inputHandler}
                                                placeholder="Enter your place"
                                            />
                                            {errors.v_place && <p style={{ color: 'red' }}>{errors.v_place}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='v_email'
                                                value={data.v_email}
                                                onChange={inputHandler}
                                                placeholder="Enter your email"
                                            />
                                            {errors.v_email && <p style={{ color: 'red' }}>{errors.v_email}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='v_password'
                                                value={data.v_password}
                                                onChange={inputHandler}
                                                placeholder="Enter your password"
                                            />
                                            {errors.v_password && <p style={{ color: 'red' }}>{errors.v_password}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='confirmpassword'
                                                value={data.confirmpassword}
                                                onChange={inputHandler}
                                                placeholder="Confirm your password"
                                            />
                                            {errors.confirmpassword && <p style={{ color: 'red' }}>{errors.confirmpassword}</p>}
                                        </div>
                                        <div className="col col-12 text-center">
                                            <button className="btn btn-success" onClick={readValue}>Register</button>
                                            <p> Users click to Login <Link to="/vendorlogin">Login</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVendor;
