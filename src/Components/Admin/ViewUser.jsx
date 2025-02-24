import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdNav from './AdNav';

const ViewUser = () => {
    const [data, changeData] = useState([]);

    const fetchData = () => {
        axios.post("http://localhost:3030/view")
            .then(response => {
                console.log("API Response:", response.data);  // Log response data
                if (Array.isArray(response.data)) {
                    changeData(response.data);  // Ensure that data is an array
                } else {
                    console.error("Expected an array but got:", response.data);
                    changeData([]);  // Fallback to an empty array if not an array
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                changeData([]);  // Set empty array on error to avoid map issue
            });
    };

    useEffect(() => fetchData(), []);

    return (
        <div>
            <AdNav />
            <br />
            <h3><u><center>View Users</center></u></h3>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <table 
                            className="table table-light table-striped-columns" 
                            style={{ width: '80%', margin: '0 auto' }} // Set table width and center it
                        >
                            <thead>
                                <tr>
                                    <th scope="col" style={headerCellStyle}>Name</th>
                                    <th scope="col" style={headerCellStyle}>Email</th>
                                    <th scope="col" style={headerCellStyle}>Phone Number</th>
                                    <th scope="col" style={headerCellStyle}>Place</th>
                                    <th scope="col" style={headerCellStyle}>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((value, index) => (
                                        <tr key={index}>
                                            <td style={cellStyle}>{value.name}</td>
                                            <td style={cellStyle}>{value.email}</td>
                                            <td style={cellStyle}>{value.phno}</td>
                                            <td style={cellStyle}>{value.place}</td>
                                            <td style={cellStyle}>{value.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={noDataStyle}>No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Inline CSS styles
const headerCellStyle = {
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2', // Light background for headers
};

const cellStyle = {
    padding: '8px',
    textAlign: 'left',
};

const noDataStyle = {
    textAlign: 'center',
    fontStyle: 'italic',
};

export default ViewUser;
