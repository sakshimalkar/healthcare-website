from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), default='patient')  # patient, doctor, admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }

class Doctor(db.Model):
    __tablename__ = 'doctors'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    qualification = db.Column(db.String(200), nullable=False)
    experience = db.Column(db.Integer, default=0)  # years
    bio = db.Column(db.Text)
    consultation_fee = db.Column(db.Float, default=0)
    available_days = db.Column(db.String(200))  # Comma separated: Mon,Tue,Wed
    available_time = db.Column(db.String(100))  # 9:00 AM - 5:00 PM
    rating = db.Column(db.Float, default=0)
    total_patients = db.Column(db.Integer, default=0)
    
    user = db.relationship('User', backref='doctor_profile')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'full_name': self.user.full_name if self.user else None,
            'specialization': self.specialization,
            'qualification': self.qualification,
            'experience': self.experience,
            'bio': self.bio,
            'consultation_fee': self.consultation_fee,
            'available_days': self.available_days.split(',') if self.available_days else [],
            'available_time': self.available_time,
            'rating': self.rating,
            'total_patients': self.total_patients
        }

class Patient(db.Model):
    __tablename__ = 'patients'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    blood_group = db.Column(db.String(5))
    address = db.Column(db.Text)
    emergency_contact = db.Column(db.String(20))
    medical_history = db.Column(db.Text)
    
    user = db.relationship('User', backref='patient_profile')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'full_name': self.user.full_name if self.user else None,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'gender': self.gender,
            'blood_group': self.blood_group,
            'address': self.address,
            'emergency_contact': self.emergency_contact,
            'medical_history': self.medical_history
        }

class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    appointment_date = db.Column(db.Date, nullable=False)
    appointment_time = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, completed, cancelled
    subject = db.Column(db.String(200), default="General Checkup")
    symptoms = db.Column(db.Text)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    patient = db.relationship('Patient', backref='appointments')
    doctor = db.relationship('Doctor', backref='appointments')
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'patient_name': self.patient.user.full_name if self.patient and self.patient.user else None,
            'doctor_id': self.doctor_id,
            'doctor_name': self.doctor.user.full_name if self.doctor and self.doctor.user else None,
            'specialization': self.doctor.specialization if self.doctor else None,
            'appointment_date': self.appointment_date.isoformat(),
            'appointment_time': self.appointment_time,
            'status': self.status,
            'symptoms': self.symptoms,
            'notes': self.notes,
            'created_at': self.created_at.isoformat()
        }