 import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaCalendarAlt, FaHeartbeat, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0
    });

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!token) {
            window.location.href = '/login';
            return;
        }
        
        setUser(userData);
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('/api/appointments/my', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const data = response.data.appointments || [];
            setAppointments(data);
            
            // Calculate stats
            const stats = {
                total: data.length,
                pending: data.filter(a => a.status === 'pending').length,
                confirmed: data.filter(a => a.status === 'confirmed').length,
                completed: data.filter(a => a.status === 'completed').length
            };
            setStats(stats);
        } catch (error) {
            toast.error('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            pending: 'warning',
            confirmed: 'info',
            completed: 'success',
            cancelled: 'danger'
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading dashboard...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">Welcome, {user?.full_name || 'User'}!</h2>
            
            {/* Statistics Cards */}
            <Row className="mb-4">
                <Col md={3} sm={6} className="mb-3">
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h3 className="text-primary">{stats.total}</h3>
                            <p className="text-muted">Total Appointments</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h3 className="text-warning">{stats.pending}</h3>
                            <p className="text-muted">Pending</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h3 className="text-info">{stats.confirmed}</h3>
                            <p className="text-muted">Confirmed</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h3 className="text-success">{stats.completed}</h3>
                            <p className="text-muted">Completed</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Appointments List */}
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0"><FaCalendarAlt className="me-2" />Your Appointments</h5>
                </Card.Header>
                <Card.Body>
                    {appointments.length === 0 ? (
                        <p className="text-center text-muted">No appointments yet.</p>
                    ) : (
                        appointments.map((appt) => (
                            <div key={appt.id} className="border-bottom py-3">
                                <Row>
                                    <Col md={4}>
                                        <strong>Dr. {appt.doctor_name}</strong>
                                        <p className="text-muted small">{appt.specialization}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p className="mb-0"><FaCalendarAlt /> {appt.appointment_date}</p>
                                        <p className="mb-0"><FaClock /> {appt.appointment_time}</p>
                                    </Col>
                                    <Col md={3}>
                                        {getStatusBadge(appt.status)}
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="outline-danger" size="sm">
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        ))
                    )}
                </Card.Body>
            </Card>

            <div className="text-center mt-4">
                <Button as={Link} to="/appointment" variant="primary">
                    Book New Appointment
                </Button>
            </div>
        </Container>
    );
}

export default Dashboard;