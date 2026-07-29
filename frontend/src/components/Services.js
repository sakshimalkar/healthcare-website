 import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaBrain, FaLungs, FaBone, FaEye, FaTooth, FaBaby, FaVial } from 'react-icons/fa';

function Services() {
    const services = [
        { icon: FaHeartbeat, title: 'Cardiology', desc: 'Expert care for heart conditions' },
        { icon: FaBrain, title: 'Neurology', desc: 'Treatment for brain and nervous system' },
        { icon: FaLungs, title: 'Pulmonology', desc: 'Respiratory care and treatment' },
        { icon: FaBone, title: 'Orthopedics', desc: 'Bone and joint specialists' },
        { icon: FaEye, title: 'Ophthalmology', desc: 'Comprehensive eye care' },
        { icon: FaTooth, title: 'Dentistry', desc: 'Complete dental services' },
        { icon: FaBaby, title: 'Pediatrics', desc: 'Child healthcare specialists' },
        { icon: FaVial, title: 'Laboratory', desc: 'Advanced diagnostic testing' },
    ];

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Our Services</h1>
            <p className="text-center text-muted mb-5">
                Comprehensive healthcare services tailored to your needs
            </p>

            <Row>
                {services.map((service, index) => (
                    <Col md={3} sm={6} className="mb-4" key={index}>
                        <Card className="text-center border-0 shadow-sm h-100">
                            <Card.Body>
                                <service.icon className="text-primary mb-3" size={40} />
                                <Card.Title className="fs-6">{service.title}</Card.Title>
                                <Card.Text className="text-muted small">
                                    {service.desc}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="text-center mt-4">
                <Button as={Link} to="/appointment" variant="primary" size="lg">
                    Book an Appointment
                </Button>
            </div>
        </Container>
    );
}

export default Services;