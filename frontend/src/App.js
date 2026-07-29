 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/custom.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import PatientPortal from './pages/PatientPortal';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/appointment" element={<Appointment />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/portal" element={<PatientPortal />} />
                    </Routes>
                </main>
                <Footer />
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </Router>
    );
}

export default App;