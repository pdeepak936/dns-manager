import React, { useState, useEffect } from 'react';
import DNSForm from './DNSForm';
import DNSRecord from './DNSRecord';
import ChartComponent from './Chart';
import BulkUpload from './BulkUpload';
import apiService from '../services/apiService';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecords();
    }, [searchTerm, filterType]);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const data = await apiService.getAllRecords(searchTerm, filterType);
            setRecords(data);
            toast.success('Records fetched successfully.');
        } catch (error) {
            toast.error('Error fetching records.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService.deleteRecord(id);
            toast.success('Record deleted successfully.');
            fetchRecords();
        } catch (error) {
            toast.error('Error deleting record.');
        }
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
    };

    const handleUpdate = async (updatedRecord) => {
        try {
            await apiService.updateRecord(updatedRecord._id, updatedRecord);
            toast.success('Record updated successfully.');
            fetchRecords();
            setSelectedRecord(null);
        } catch (error) {
            toast.error('Error updating record.');
        }
    };

    const filteredRecords = records.filter(record => {
        return (
            (record.domain.includes(searchTerm) || record.value.includes(searchTerm)) &&
            (filterType ? record.type === filterType : true)
        );
    });

    return (
        <div>
            <h1>DNS Manager Dashboard</h1>
            {loading ? <p>Loading...</p> : null}
            <DNSForm fetchRecords={fetchRecords} selectedRecord={selectedRecord} handleUpdate={handleUpdate} />
            <BulkUpload fetchRecords={fetchRecords} />
            <h2>DNS Records</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="A">A</option>
                    <option value="AAAA">AAAA</option>
                    <option value="CNAME">CNAME</option>
                    <option value="MX">MX</option>
                    <option value="NS">NS</option>
                    <option value="PTR">PTR</option>
                    <option value="SOA">SOA</option>
                    <option value="SRV">SRV</option>
                    <option value="TXT">TXT</option>
                    <option value="DNSSEC">DNSSEC</option>
                </select>
            </div>
            <table>
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
                    {filteredRecords.map(record => (
                        <DNSRecord key={record._id} record={record} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                </tbody>
            </table>
            <h2>Record Type Distribution</h2>
            <ChartComponent records={records} />
        </div>
    );
};

export default Dashboard;
