import React, { useState, useEffect } from 'react';
import DNSForm from '../components/DNSForm';
import DNSRecord from '../components/DNSRecord';
import apiService from '../services/apiService';

const Home = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await apiService.getAllRecords();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService.deleteRecord(id);
            fetchRecords(); // Refresh the records after deletion
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <div>
            <h1>DNS Manager</h1>
            <DNSForm fetchRecords={fetchRecords} />
            <h2>DNS Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <DNSRecord key={record._id} record={record} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
