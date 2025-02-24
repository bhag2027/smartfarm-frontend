import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdNav from './AdNav';

const ViewVendors = () => {
    const [data, changeData] = useState([]);

    const fetchData = () => {
        axios.post("http://localhost:3030/viewvendor")
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
            <h3><u><center>View Vendors</center></u></h3>
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
                                    <th scope="col" style={headerCellStyle}>VName</th>
                                    <th scope="col" style={headerCellStyle}>VEmail</th>
                                    <th scope="col" style={headerCellStyle}>VPhoneNumber</th>
                                    <th scope="col" style={headerCellStyle}>VPlace</th>
                                    <th scope="col" style={headerCellStyle}>VAddress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((value, index) => (
                                        <tr key={index}>
                                            <td style={cellStyle}>{value.v_name}</td>
                                            <td style={cellStyle}>{value.v_email}</td>
                                            <td style={cellStyle}>{value.v_phno}</td>
                                            <td style={cellStyle}>{value.v_place}</td>
                                            <td style={cellStyle}>{value.v_address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={noDataStyle}>No vendors found</td>
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

export default ViewVendors;
