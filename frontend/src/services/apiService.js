import axios from 'axios';

const API_BASE_URL = 'https://dns-manager-9fny.onrender.com/api';

const login = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
};

const register = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, credentials);
    return response.data;
};

// Update other API calls to include the token if necessary
const getAllRecords = async (search = '', type = '') => {
    const token = localStorage.getItem('token');
    const params = {};
    if (search) params.search = search;
    if (type) params.type = type;

    const response = await axios.get(`${API_BASE_URL}/dns`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const createRecord = async (recordData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/dns`, recordData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const updateRecord = async (recordId, recordData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/dns/${recordId}`, recordData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const deleteRecord = async (recordId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/dns/${recordId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default {
    login,
    register,
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord,
};
