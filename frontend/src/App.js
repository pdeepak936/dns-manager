import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DNSForm from './components/DNSForm';
import DNSRecord from './components/DNSRecordsPage';
import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';



const App = () => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginRegister type="login" />} />
                <Route path="/register" element={<LoginRegister type="register" />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dnsform" element={<ProtectedRoute><DNSForm /></ProtectedRoute>} />
                <Route path="/dnsrecord" element={<ProtectedRoute><DNSRecord /></ProtectedRoute>} />
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
