 import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUserMd, FaSignOutAlt, FaUser } from 'react-icons/fa';

function CustomNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (token) {
            setIsLoggedIn(true);
            setUserName(user.full_name || 'User');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    <FaUserMd className="me-2" />
                    HealthCare Plus
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/services">Services</Nav.Link>
                        <Nav.Link as={Link} to="/doctors">Doctors</Nav.Link>
                        <Nav.Link as={Link} to="/appointment">Book Appointment</Nav.Link>
                        
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
                                    <FaUser className="me-1" /> {userName.split(' ')[0]}
                                </Nav.Link>
                                <Button 
                                    variant="outline-light" 
                                    size="sm" 
                                    onClick={handleLogout}
                                    className="ms-2"
                                >
                                    <FaSignOutAlt /> Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;