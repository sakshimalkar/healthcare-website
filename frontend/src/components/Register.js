 import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendar, FaUserMd } from 'react-icons/fa';

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        role: 'patient',
        date_of_birth: '',
        gender: '',
        blood_group: '',
        address: '',
        emergency_contact: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/register', formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={7}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0"><FaUserMd className="me-2" />Register</h4>
                        </Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="full_name"
                                                placeholder="Enter your full name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label><FaLock className="me-2" />Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                minLength={6}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label><FaPhone className="me-2" />Phone</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label><FaCalendar className="me-2" />Date of Birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date_of_birth"
                                                value={formData.date_of_birth}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Blood Group</Form.Label>
                                            <Form.Select
                                                name="blood_group"
                                                value={formData.blood_group}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                            >
                                                <option value="patient">Patient</option>
                                                <option value="doctor">Doctor</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="address"
                                        placeholder="Enter your address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Emergency Contact</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="emergency_contact"
                                        placeholder="Emergency contact number"
                                        value={formData.emergency_contact}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </Button>
                            </Form>

                            <hr />
                            <div className="text-center">
                                <p className="mb-0">
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;