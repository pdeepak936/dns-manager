import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_BASE_URL = 'http://localhost:3001/api';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        return jwtDecode(token);
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const getToken = () => {
    return localStorage.getItem('token');
};

const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (ex) {
        return false;
    }
};

export default {
    login,
    logout,
    isAuthenticated,
    getToken,
};
