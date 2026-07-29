 import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserMd, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaEdit } from 'react-icons/fa';

function PatientPortal() {
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        blood_group: '',
        address: '',
        emergency_contact: '',
        medical_history: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('/api/patients/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data.patient || {});
        } catch (error) {
            toast.error('Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            await axios.put('/api/patients/profile', profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Profile updated successfully!');
            setEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading profile...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4"><FaUserMd className="me-2" />Patient Portal</h2>
            
            <Row>
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <div className="bg-primary rounded-circle d-inline-flex p-4 mb-3">
                                <FaUser size={50} color="white" />
                            </div>
                            <h4>{profile.full_name}</h4>
                            <p className="text-muted">Patient</p>
                            <Button 
                                variant="outline-primary" 
                                onClick={() => setEditing(!editing)}
                            >
                                <FaEdit /> {editing ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Profile Details</h5>
                        </Card.Header>
                        <Card.Body>
                            {editing ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="full_name"
                                            value={profile.full_name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            name="address"
                                            value={profile.address}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Medical History</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="medical_history"
                                            value={profile.medical_history}
                                            onChange={handleChange}
                                            placeholder="Any medical conditions, allergies, etc."
                                        />
                                    </Form.Group>
                                    <Button type="submit" variant="primary">
                                        Save Changes
                                    </Button>
                                </Form>
                            ) : (
                                <div>
                                    <p><FaEnvelope className="me-2" /><strong>Email:</strong> {profile.email}</p>
                                    <p><FaPhone className="me-2" /><strong>Phone:</strong> {profile.phone}</p>
                                    <p><FaCalendarAlt className="me-2" /><strong>Date of Birth:</strong> {profile.date_of_birth}</p>
                                    <p><strong>Gender:</strong> {profile.gender}</p>
                                    <p><strong>Blood Group:</strong> {profile.blood_group}</p>
                                    <p><strong>Address:</strong> {profile.address}</p>
                                    <p><strong>Emergency Contact:</strong> {profile.emergency_contact}</p>
                                    <p><strong>Medical History:</strong> {profile.medical_history || 'None provided'}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PatientPortal;