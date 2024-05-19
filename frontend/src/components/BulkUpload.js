import React from 'react';
import CSVReader from 'react-csv-reader';
import apiService from '../services/apiService';

const BulkUpload = ({ fetchRecords }) => {
    const handleFileLoad = async (data) => {
        try {
            for (let record of data) {
                await apiService.createRecord(record);
            }
            fetchRecords();
        } catch (error) {
            console.error('Error uploading records:', error);
        }
    };

    return (
        <div>
            <h2>Bulk Upload</h2>
            <CSVReader onFileLoaded={handleFileLoad} />
        </div>
    );
};

export default BulkUpload;
