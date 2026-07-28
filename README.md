<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</div>

<br/>

# 🏥 HealthCare Plus

## Complete Healthcare Management System

[![GitHub stars](https://img.shields.io/github/stars/yourusername/healthcare-website.svg?style=social)](https://github.com/yourusername/healthcare-website)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/healthcare-website.svg?style=social)](https://github.com/yourusername/healthcare-website)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/healthcare-website.svg)](https://github.com/yourusername/healthcare-website)
[![GitHub license](https://img.shields.io/github/license/yourusername/healthcare-website.svg)](https://github.com/yourusername/healthcare-website)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## ✨ Live Demo

> 🔗 https://sakshimalkar.github.io/E-Learning/

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Installation Guide](#-installation-guide)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📖 Overview

**HealthCare Plus** is a full-stack healthcare management platform designed to streamline the patient-doctor interaction process. It provides a seamless experience for patients to discover doctors, book appointments, and manage their health records, while offering healthcare providers a robust system to manage their schedules and patient interactions.

### 🎯 Key Objectives

- **Simplify** the appointment booking process
- **Empower** patients with easy access to healthcare services
- **Optimize** doctor-patient communication
- **Reduce** waiting times through efficient scheduling

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure JWT-based authentication**
- **Role-based access control** (Admin, Doctor, Patient)
- **Password encryption** using bcrypt
- **Protected API endpoints**

### 👨‍⚕️ For Patients
- **Easy registration** and profile management
- **Browse doctors** by specialization
- **Book appointments** with preferred doctors
- **View appointment history** and status
- **Update personal information** and medical history
- **Cancel appointments** when needed

### 👩‍⚕️ For Doctors
- **Manage appointment schedules**
- **View patient details** and medical history
- **Update appointment status** (Pending → Confirmed → Completed)
- **Track consultation history**

### 🛡️ For Admins
- **Manage doctor profiles**
- **Monitor system activities**
- **Generate reports and analytics**

### 📱 User Experience
- **Responsive design** for all devices
- **Real-time updates** and notifications
- **User-friendly interface** with Bootstrap
- **Toast notifications** for user feedback

---

## 🚀 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI Framework |
| React Router | 6.20.0 | Navigation |
| Bootstrap | 5.3.2 | Styling & Components |
| React Bootstrap | 2.9.1 | Bootstrap Components |
| Axios | 1.6.0 | HTTP Requests |
| React Toastify | 9.1.3 | Notifications |
| React Icons | 4.11.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.8+ | Programming Language |
| Flask | 2.3.2 | Web Framework |
| Flask-SQLAlchemy | 3.0.5 | ORM |
| Flask-JWT-Extended | 4.5.3 | JWT Authentication |
| Flask-CORS | 4.0.0 | CORS Handling |
| bcrypt | 4.0.1 | Password Hashing |
| SQLite | - | Database |

---

### 📊 Database Schema

Users
├── id (PK)
├── full_name
├── email (UNIQUE)
├── password (Hashed)
├── phone
├── role (admin/doctor/patient)
└── created_at

Doctors
├── id (PK)
├── user_id (FK → Users.id)
├── specialization
├── qualification
├── experience
├── bio
├── consultation_fee
├── available_days
├── available_time
├── rating
└── total_patients

Patients
├── id (PK)
├── user_id (FK → Users.id)
├── date_of_birth
├── gender
├── blood_group
├── address
├── emergency_contact
└── medical_history

Appointments
├── id (PK)
├── patient_id (FK → Patients.id)
├── doctor_id (FK → Doctors.id)
├── appointment_date
├── appointment_time
├── status (pending/confirmed/completed/cancelled)
├── symptoms
├── notes
└── created_at

👩‍💻 Developer
Sakshi Malkar

https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white

🙏 Acknowledgments
React.js - UI Framework

Flask - Web Framework

Bootstrap - CSS Framework

SQLite - Database

📧 Contact
For any queries or suggestions, please reach out to:

Email: sakshimalkar@email.com

LinkedIn: Sakshi Malkar

<div align="center"> <sub>Built with ❤️ by <a href="https://linkedin.com/in/sakshimalkar">Sakshi Malkar</a></sub> <br/> <sub>⭐ Star this repository if you find it helpful!</sub> </div> ```
