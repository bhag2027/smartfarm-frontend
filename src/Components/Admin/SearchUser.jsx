import axios from 'axios';
import React, { useState } from 'react';
import AdNav from './AdNav';

const SearchUser = () => {
    const [data, setData] = useState({ name: "", type: "user" }); // Added type state
    const [result, setResult] = useState([]);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);
        const url = data.type === "user" ? "http://localhost:3030/search/user" : "http://localhost:3030/search/vendor"; // Adjust URL based on type
        axios.post(url, { [data.type === "user" ? "name" : "v_name"]: data.name }).then(
            (response) => {
                setResult(response.data);
            }
        ).catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    const deleteUser = (id) => {
        const input = { "_id": id };
        const url = data.type === "user" ? "http://localhost:3030/delete/user" : "http://localhost:3030/delete/vendor"; // Adjust URL based on type
        axios.post(url, input).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully Deleted");
                    // Remove the deleted user/vendor from the result
                    setResult((prev) => prev.filter(item => item._id !== id));
                } else {
                    alert("Error deleting item");
                }
            }
        ).catch((error) => {
            console.error("Error deleting item:", error);
        });
    };

    return (
        <div>
            <AdNav />
            <br />
            <h3><u><center>Search Users/Vendors</center></u></h3>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-md-8"> {/* Left space for the search area */}
                        {/* Empty column for spacing */}
                    </div>
                    <div className="col col-12 col-md-4">
                        <div className="row g-3">
                            <div className="col col-12">
                                <label htmlFor="" className="form-label">User/Vendor Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name='name' 
                                    value={data.name} 
                                    onChange={inputHandler} 
                                    placeholder={data.type === "user" ? "Enter username" : "Enter vendor name"}
                                />
                            </div>
                            <div className="col col-12">
                                <label htmlFor="" className="form-label">Type</label>
                                <select className="form-select" name='type' value={data.type} onChange={inputHandler}>
                                    <option value="user">User</option>
                                    <option value="vendor">Vendor</option>
                                </select>
                            </div>
                            <div className="col col-12">
                                <center>
                                    <button className="btn btn-success" onClick={readValue}>Search</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col col-12">
                    <table 
                        className="table table-bordered border-primary" 
                        style={{ width: '60%', margin: '0 auto', fontSize: '14px' }} // Reduced table width and font size
                    >
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Place</th>
                                <th scope="col">Address</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.length > 0 ? (
                                result.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.name || value.v_name}</td> {/* Adjusted to display name or vendor name */}
                                        <td>{value.email || value.v_email}</td>
                                        <td>{value.phno || value.v_phno}</td>
                                        <td>{value.place || value.v_place}</td>
                                        <td>{value.address || value.v_address}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { deleteUser(value._id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No users or vendors found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchUser;
