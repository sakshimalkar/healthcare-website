 import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaUserMd, FaClock, FaNotesMedical, FaArrowLeft } from 'react-icons/fa';

function Appointment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        symptoms: '',
        notes: ''
    });

    useEffect(() => {
        fetchDoctors();
        const params = new URLSearchParams(location.search);
        const doctorId = params.get('doctor');
        if (doctorId) {
            setFormData(prev => ({ ...prev, doctor_id: doctorId }));
        }
    }, [location]);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/doctors/');
            setDoctors(response.data.doctors || []);
        } catch (error) {
            toast.error('Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.warning('Please login to book appointment');
            navigate('/login');
            return;
        }

        try {
            setSubmitting(true);

                       // Build the payload
            const payload = {
                doctor_id: parseInt(formData.doctor_id), 
                appointment_date: formData.appointment_date, 
                appointment_time: formData.appointment_time,
                symptoms: formData.symptoms,
                notes: formData.notes,
                // 🚨 ABSOLUTE FINAL FIX: 
                // We manually provide the subject so Marshmallow stops blocking us.
                subject: formData.symptoms || "General Consultation"
            };

            console.log("📤 SENDING TO BACKEND:", payload);

            const response = await axios.post('http://localhost:5000/api/appointments/', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            toast.success('Appointment booked successfully!');
            setFormData({
                doctor_id: '',
                appointment_date: '',
                appointment_time: '',
                symptoms: '',
                notes: ''
            });
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error('Booking error:', error.response?.data); 
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3 text-secondary">Loading doctors...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Button variant="link" className="mb-3 text-decoration-none text-secondary" onClick={() => navigate(-1)}>
                <FaArrowLeft className="me-2" /> Back
            </Button>
            
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="health-card appointment-form">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold" style={{ color: 'var(--primary)' }}><FaCalendarAlt className="me-2" /> Book Appointment</h3>
                            <p className="text-muted">Schedule your visit with a specialist today</p>
                        </div>
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold"><FaUserMd className="me-2 text-primary-custom" />Select Doctor</Form.Label>
                                <Form.Select
                                    name="doctor_id"
                                    value={formData.doctor_id}
                                    onChange={handleChange}
                                    required
                                    className="form-select-lg"
                                >
                                    <option value="">Choose a doctor...</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>
                                            Dr. {doctor.full_name} - {doctor.specialization}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold"><FaCalendarAlt className="me-2 text-primary-custom" />Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="appointment_date"
                                            value={formData.appointment_date}
                                            onChange={handleChange}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold"><FaClock className="me-2 text-primary-custom" />Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="appointment_time"
                                            value={formData.appointment_time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold"><FaNotesMedical className="me-2 text-primary-custom" />Symptoms</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="symptoms"
                                    value={formData.symptoms}
                                    onChange={handleChange}
                                    placeholder="Describe your symptoms briefly..."
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">Additional Notes</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Any additional information..."
                                />
                            </Form.Group>

                            <Button 
                                type="submit" 
                                variant="primary" 
                                size="lg" 
                                className="w-100 py-3 shadow-sm"
                                disabled={submitting}
                            >
                                {submitting ? 'Booking...' : 'Confirm Appointment'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Appointment;