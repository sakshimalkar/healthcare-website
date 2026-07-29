 import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { FaStar, FaUserMd, FaCalendarAlt, FaPhone, FaEnvelope, FaStethoscope } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/doctors/');
            setDoctors(response.data.doctors || []);
        } catch (error) {
            toast.error('Failed to fetch doctors');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = (doctorId) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.warning('Please login to book appointment');
            window.location.href = '/login';
            return;
        }
        window.location.href = `/appointment?doctor=${doctorId}`;
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading doctors...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Our Doctors</h1>
            <p className="text-center text-muted mb-5">
                Meet our team of experienced and compassionate healthcare professionals
            </p>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search by name or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Row>
                {filteredDoctors.length === 0 ? (
                    <Col>
                        <p className="text-center text-muted">No doctors found</p>
                    </Col>
                ) : (
                    filteredDoctors.map((doctor) => (
                        <Col md={6} lg={4} key={doctor.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <div className="text-center mb-3">
                                        <div className="bg-primary rounded-circle d-inline-flex p-3">
                                            <FaUserMd size={40} color="white" />
                                        </div>
                                    </div>
                                    <Card.Title className="text-center">{doctor.full_name}</Card.Title>
                                    <Card.Subtitle className="text-center text-muted mb-3">
                                        <Badge bg="info">{doctor.specialization}</Badge>
                                    </Card.Subtitle>
                                    <div className="mb-3">
                                        <p className="small mb-1"><FaStethoscope /> {doctor.qualification}</p>
                                        <p className="small mb-1"><FaStar className="text-warning" /> {doctor.rating || '4.5'} ★</p>
                                        <p className="small mb-1">Experience: {doctor.experience}+ years</p>
                                        <p className="small mb-1">Fee: ₹{doctor.consultation_fee}</p>
                                        <p className="small mb-1">Patients: {doctor.total_patients || 0}+</p>
                                    </div>
                                    <Button 
                                        variant="primary" 
                                        className="w-100"
                                        onClick={() => handleBookAppointment(doctor.id)}
                                    >
                                        Book Appointment
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default Doctors;