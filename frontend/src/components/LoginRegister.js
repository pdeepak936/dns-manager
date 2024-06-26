import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegister = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'login') {
                const response = await apiService.login({ email, password });
                localStorage.setItem('token', response.token);
                navigate('/dashboard'); // Navigate to Dashboard after login
            } else {
                await apiService.register({ email, password });
                navigate('/login'); // Navigate to Login after successful registration
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };
    return (
        <Card>
            <ToastContainer />
            <Card.Body>
                <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {type === 'login' ? 'Login' : 'Register'}
                    </Button>
                </Form>
                <Button variant="link" onClick={() => navigate(type === 'login' ? '/register' : '/login')}>
                    {type === 'login' ? 'Register' : 'Login'} here
                </Button>
            </Card.Body>
        </Card>
    );
};

export default LoginRegister;
