import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); 
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand" to="/">DNS Manager</Link>
                </div>

                <div className="collapse navbar-collapse justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dnsform">DNS Form</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
