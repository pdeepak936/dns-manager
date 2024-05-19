// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import authService from '../services/authService';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await authService.login(email, password);
//             toast.success('Login successful!');
//             navigate('/');
//         } catch (error) {
//             toast.error('Invalid email or password.');
//         }
//     };

//     return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <Card style={{ marginTop: '50px' }}>
//                         <Card.Body>
//                             <Card.Title>Login</Card.Title>
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
//                                 <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
//                                     Login
//                                 </Button>
//                             </Form>
//                             <div className="mt-3">
//                                 <p>
//                                     Don't have an account? <Link to="/register">Register</Link>
//                                 </p>
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3001/api/auth/login', { email, password });
            localStorage.setItem('authToken', data.token);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Card style={{ maxWidth: '500px', margin: 'auto', marginTop: '100px' }}>
            <Card.Body>
                <Card.Title>Login</Card.Title>
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
                        Login
                    </Button>
                </Form>
                <div style={{ marginTop: '20px' }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Login;