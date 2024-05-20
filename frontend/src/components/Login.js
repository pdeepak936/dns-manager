import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/auth/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            history.push('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Card>
            <Card.Body>
                <h2 className="mb-3">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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
                        Login
                    </Button>
                </Form>
                <div className="mt-3">
                    <NavLink to="/register">Don't have an account? Register</NavLink>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Login;
