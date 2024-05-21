import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import DNSRecord from './DNSRecord';

const DNSRecordsPage = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const data = await apiService.getAllRecords();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []);

    return (
        <div>
            <h2>DNS Records</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>TTL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <DNSRecord key={record._id} record={record} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DNSRecordsPage;
