 import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaHeartbeat, FaAmbulance } from 'react-icons/fa';

function Home() {
    const navigate = useNavigate();

    return (
        <Container className="py-5">
            <div className="hero-section">
                <h1 className="hero-title">Your Health, <span className="text-primary-custom">Our Priority</span></h1>
                <p className="hero-subtitle mb-4">
                    Connect with top specialists, book appointments instantly, and take control of your healthcare journey.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Button size="lg" onClick={() => navigate('/doctors')}>Find a Doctor</Button>
                    <Button size="lg" variant="outline-primary" onClick={() => navigate('/login')}>Patient Login</Button>
                </div>
            </div>

            <Row className="mt-5 g-4 text-center">
                <Col md={4}>
                    <div className="health-card p-4">
                        <FaUserMd size={40} className="text-primary-custom mb-3" />
                        <h5>Expert Specialists</h5>
                        <p className="text-muted">Access to top-rated doctors across various medical fields.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="health-card p-4">
                        <FaHeartbeat size={40} className="text-primary-custom mb-3" />
                        <h5>Instant Booking</h5>
                        <p className="text-muted">Schedule appointments in seconds with our easy-to-use system.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="health-card p-4">
                        <FaAmbulance size={40} className="text-primary-custom mb-3" />
                        <h5>Emergency Ready</h5>
                        <p className="text-muted">Fast-track access to urgent care and medical assistance.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;