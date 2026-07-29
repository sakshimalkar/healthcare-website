 import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <Container>
                <Row>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>HealthCare Plus</h5>
                        <p className="text-muted small">
                            Your trusted partner in health and wellness. 
                            Providing quality healthcare services with compassion.
                        </p>
                    </Col>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about" className="text-muted text-decoration-none">About Us</a></li>
                            <li><a href="/services" className="text-muted text-decoration-none">Services</a></li>
                            <li><a href="/doctors" className="text-muted text-decoration-none">Doctors</a></li>
                            <li><a href="/appointment" className="text-muted text-decoration-none">Book Appointment</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact</h5>
                        <p className="text-muted small">Email: info@healthcareplus.com</p>
                        <p className="text-muted small">Phone: +91 12345 67890</p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white"><FaFacebook /></a>
                            <a href="#" className="text-white"><FaTwitter /></a>
                            <a href="#" className="text-white"><FaInstagram /></a>
                            <a href="#" className="text-white"><FaLinkedin /></a>
                        </div>
                    </Col>
                </Row>
                <hr className="bg-secondary" />
                <Row>
                    <Col className="text-center text-muted small">
                        &copy; 2026 HealthCare Plus. All rights reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;