import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/dns';

const getAllRecords = async (search = '', type = '') => {
    try {
        const params = {};
        if (search) params.search = search;
        if (type) params.type = type;

        const response = await axios.get(API_BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};


const createRecord = async (recordData) => {
    try {
        const response = await axios.post(API_BASE_URL, recordData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateRecord = async (recordId, recordData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${recordId}`, recordData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteRecord = async (recordId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${recordId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
