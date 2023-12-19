import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BusinessList.css';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:1337/business?page=${page}`)
            .then(response => {
                console.log(response.data); // Log the response data
                setBusinesses(response.data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [page]);

    return (
        <div>
        <h1>Business List</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Postal Code</th>
                    <th>Stars</th>
                    <th>Review Count</th>
                    <th>Is Open</th>
                    <th>Categories</th>
                </tr>
            </thead>
            <tbody>
                {businesses.map(business => (
                    <tr key={business.business_id}>
                        <td>{business.business_id}</td>
                        <td>{business.name}</td>
                        <td>{business.address}</td>
                        <td>{business.city}</td>
                        <td>{business.state}</td>
                        <td>{business.postal_code}</td>
                        <td>{business.stars}</td>
                        <td>{business.review_count}</td>
                        <td>{business.is_open ? 'Yes' : 'No'}</td>
                        <td>{business.categories}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="pagination">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Prev</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </div>
    </div>
);
}

export default BusinessList;