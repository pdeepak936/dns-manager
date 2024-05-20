import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import apiService from '../services/apiService';

const LoginRegister = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'login') {
                const response = await apiService.login({ email, password });
                localStorage.setItem('token', response.token);
            } else {
                await apiService.register({ email, password });
            }
            window.location.href = '/';
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <Card>
            <Card.Body>
                <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
                {error && <Alert variant="danger">{error}</Alert>}
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
                <Button variant="link" onClick={() => window.location.href = type === 'login' ? '/register' : '/login'}>
                    {type === 'login' ? 'Register' : 'Login'} here
                </Button>
            </Card.Body>
        </Card>
    );
};

export default LoginRegister;
