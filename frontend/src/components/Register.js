import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify({ email, password }))
            debugger
            const responce = await axios.post('http://localhost:8001/api/auth/register', { email, password });
            
            // history.push('/login');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <Card>
            <Card.Body>
                <h2 className="mb-3">Register</h2>
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
                        Register
                    </Button>
                </Form>
                <div className="mt-3">
                    <NavLink to="/login">Already have an account? Login</NavLink>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Register;
