// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import authService from '../services/authService';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             toast.error('Passwords do not match.');
//             return;
//         }

//         try {
//             await authService.register(email, password);
//             toast.success('Registration successful!');
//             navigate('/login');
//         } catch (error) {
//             toast.error('Registration failed.');
//         }
//     };

//     return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <Card style={{ marginTop: '50px' }}>
//                         <Card.Body>
//                             <Card.Title>Register</Card.Title>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group controlId="formEmail">
//                                     <Form.Label>Email</Form.Label>
//                                     <Form.Control
//                                         type="email"
//                                         placeholder="Enter email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formPassword">
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control
//                                         type="password"
//                                         placeholder="Enter password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formConfirmPassword">
//                                     <Form.Label>Confirm Password</Form.Label>
//                                     <Form.Control
//                                         type="password"
//                                         placeholder="Confirm password"
//                                         value={confirmPassword}
//                                         onChange={(e) => setConfirmPassword(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
//                                     Register
//                                 </Button>
//                             </Form>
//                             <div className="mt-3">
//                                 <p>
//                                     Already have an account? <Link to="/login">Login</Link>
//                                 </p>
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8001/api/auth/register', { email, password });
            localStorage.setItem('authToken', data.token);
            navigate('/');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <Card style={{ maxWidth: '500px', margin: 'auto', marginTop: '100px' }}>
            <Card.Body>
                <Card.Title>Register</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
                        Register
                    </Button>
                </Form>
                <div style={{ marginTop: '20px' }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Register;
