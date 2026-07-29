from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Appointment, Patient, Doctor, User
from datetime import datetime

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['POST'])
@jwt_required()
def book_appointment():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        patient = Patient.query.filter_by(user_id=user_id).first()
        if not patient:
            return jsonify({'message': 'Patient profile not found'}), 404
        
        doctor = Doctor.query.get(data['doctor_id'])
        if not doctor:
            return jsonify({'message': 'Doctor not found'}), 404
        
        appointment = Appointment(
            patient_id=patient.id,
            doctor_id=data['doctor_id'],
            appointment_date=datetime.strptime(data['appointment_date'], '%Y-%m-%d').date(),
            appointment_time=data['appointment_time'],
            symptoms=data.get('symptoms', ''),
            notes=data.get('notes', ''),
            status='pending'
        )
        
        db.session.add(appointment)
        db.session.commit()
        
        return jsonify({
            'message': 'Appointment booked successfully',
            'appointment': appointment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500

@appointments_bp.route('/my', methods=['GET'])
@jwt_required()
def get_my_appointments():
    try:
        user_id = get_jwt_identity()
        patient = Patient.query.filter_by(user_id=user_id).first()
        
        if not patient:
            return jsonify({'message': 'Patient profile not found'}), 404
        
        appointments = Appointment.query.filter_by(patient_id=patient.id).all()
        
        return jsonify({
            'appointments': [appt.to_dict() for appt in appointments]
        }), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@appointments_bp.route('/doctor/<int:doctor_id>', methods=['GET'])
def get_doctor_appointments(doctor_id):
    try:
        appointments = Appointment.query.filter_by(doctor_id=doctor_id).all()
        
        return jsonify({
            'appointments': [appt.to_dict() for appt in appointments]
        }), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@appointments_bp.route('/<int:appointment_id>/status', methods=['PUT'])
@jwt_required()
def update_appointment_status(appointment_id):
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return jsonify({'message': 'Appointment not found'}), 404
        
        user = User.query.get(user_id)
        patient = Patient.query.filter_by(user_id=user_id).first()
        doctor = Doctor.query.filter_by(user_id=user_id).first()
        
        if not (patient or doctor):
            return jsonify({'message': 'Unauthorized'}), 403
        
        if data['status'] == 'cancelled' and patient and appointment.patient_id == patient.id:
            appointment.status = 'cancelled'
        elif doctor and appointment.doctor_id == doctor.id:
            appointment.status = data['status']
        else:
            return jsonify({'message': 'Unauthorized'}), 403
        
        db.session.commit()
        
        return jsonify({
            'message': 'Appointment updated successfully',
            'appointment': appointment.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500