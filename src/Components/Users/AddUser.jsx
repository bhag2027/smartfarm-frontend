import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chick3 from '../../assets/chick3.jpg'; // Update the path to your background image

const AddUser = () => {
    const [data, changeData] = useState({
        name: "",
        phno: "",
        address: "",
        place: "",
        email: "",
        password: "",
        confirmpswd: ""
    });
    const [errors, setErrors] = useState({}); // State to hold error messages

    const inputHandler = (event) => {
        changeData({ ...data, [event.target.name]: event.target.value });
    }

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!data.name) newErrors.name = "Name is required.";

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            newErrors.email = "Email is required.";
        } else if (!emailPattern.test(data.email)) {
            newErrors.email = "Invalid email format.";
        }

        // Phone number validation
        const phonePattern = /^[0-9]{10}$/; // Adjust pattern according to your needs
        if (!data.phno) {
            newErrors.phno = "Phone number is required.";
        } else if (!phonePattern.test(data.phno)) {
            newErrors.phno = "Phone number must be 10 digits.";
        }

        // Address validation
        if (!data.address) newErrors.address = "Address is required.";
        if (!data.place) newErrors.place = "Place is required.";

        // Password validation
        if (!data.password) {
            newErrors.password = "Password is required.";
        } else if (data.password !== data.confirmpswd) {
            newErrors.confirmpswd = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    }

    const readValue = () => {
        if (validateForm()) {
            console.log(data);
            axios.post("http://localhost:3030/signup", data).then(
                (response) => {
                    console.log(response.data);
                    if (response.data.status === "success") {
                        alert("Successfully added");
                    } else {
                        alert("Failed");
                    }
                }
            ).catch(err => {
                console.error(err);
                alert("An error occurred while signing up.");
            });
        }
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
            <div className="card" style={{ width: '500px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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
                                                name='name'
                                                value={data.name}
                                                onChange={inputHandler}
                                                placeholder="Enter your name"
                                            />
                                            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='email'
                                                value={data.email}
                                                onChange={inputHandler}
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='phno'
                                                value={data.phno}
                                                onChange={inputHandler}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.phno && <p style={{ color: 'red' }}>{errors.phno}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Place</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='place'
                                                value={data.place}
                                                onChange={inputHandler}
                                                placeholder="Enter your place"
                                            />
                                            {errors.place && <p style={{ color: 'red' }}>{errors.place}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='address'
                                                value={data.address}
                                                onChange={inputHandler}
                                                placeholder="Enter your address"
                                            />
                                            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='password'
                                                value={data.password}
                                                onChange={inputHandler}
                                                placeholder="Enter your password"
                                            />
                                            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                                        </div>
                                        <div className="col col-12 col-sm-6">
                                            <label className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='confirmpswd'
                                                value={data.confirmpswd}
                                                onChange={inputHandler}
                                                placeholder="Confirm your password"
                                            />
                                            {errors.confirmpswd && <p style={{ color: 'red' }}>{errors.confirmpswd}</p>}
                                        </div>
                                        <div className="col col-12 text-center">
                                            <button className="btn btn-success" onClick={readValue}>Register</button>
                                            <p> Users click to Login <Link to='/login'>Login</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser;
