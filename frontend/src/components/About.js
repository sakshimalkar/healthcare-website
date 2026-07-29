 import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart, FaStar, FaUsers, FaTrophy } from 'react-icons/fa';

function About() {
    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">About Us</h1>
            <p className="text-center text-muted mb-5">
                Learn more about our mission, values, and the team behind HealthCare Plus
            </p>

            <Row className="mb-5">
                <Col md={8} className="mx-auto">
                    <h3>Our Mission</h3>
                    <p className="lead">
                        To provide accessible, high-quality healthcare services to every individual, 
                        ensuring compassionate care and medical excellence.
                    </p>
                    <p>
                        At HealthCare Plus, we believe that everyone deserves access to quality healthcare. 
                        Our team of dedicated professionals works tirelessly to ensure that our patients 
                        receive the best possible care in a comfortable and supportive environment.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="text-center border-0 shadow-sm h-100">
                        <Card.Body>
                            <FaHeart className="text-primary mb-3" size={36} />
                            <Card.Title>Compassion</Card.Title>
                            <Card.Text className="text-muted small">
                                We treat every patient with empathy and respect
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="text-center border-0 shadow-sm h-100">
                        <Card.Body>
                            <FaStar className="text-primary mb-3" size={36} />
                            <Card.Title>Excellence</Card.Title>
                            <Card.Text className="text-muted small">
                                We strive for the highest standards of medical care
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="text-center border-0 shadow-sm h-100">
                        <Card.Body>
                            <FaUsers className="text-primary mb-3" size={36} />
                            <Card.Title>Teamwork</Card.Title>
                            <Card.Text className="text-muted small">
                                Collaboration ensures the best outcomes for our patients
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="text-center border-0 shadow-sm h-100">
                        <Card.Body>
                            <FaTrophy className="text-primary mb-3" size={36} />
                            <Card.Title>Innovation</Card.Title>
                            <Card.Text className="text-muted small">
                                We embrace technology for better healthcare delivery
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default About;