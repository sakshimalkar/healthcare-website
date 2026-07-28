from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Doctor, User

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('/', methods=['GET'])
def get_doctors():
    try:
        specialization = request.args.get('specialization')
        query = Doctor.query
        
        if specialization:
            query = query.filter(Doctor.specialization.ilike(f'%{specialization}%'))
        
        doctors = query.all()
        
        return jsonify({
            'doctors': [doctor.to_dict() for doctor in doctors]
        }), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@doctors_bp.route('/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    try:
        doctor = Doctor.query.get(doctor_id)
        
        if not doctor:
            return jsonify({'message': 'Doctor not found'}), 404
        
        return jsonify({'doctor': doctor.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@doctors_bp.route('/', methods=['POST'])
@jwt_required()
def add_doctor():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if user.role != 'admin':
            return jsonify({'message': 'Admin access required'}), 403
        
        data = request.get_json()
        
        doctor = Doctor(
            user_id=data['user_id'],
            specialization=data['specialization'],
            qualification=data['qualification'],
            experience=data.get('experience', 0),
            bio=data.get('bio', ''),
            consultation_fee=data.get('consultation_fee', 0),
            available_days=','.join(data.get('available_days', [])),
            available_time=data.get('available_time', '')
        )
        
        db.session.add(doctor)
        db.session.commit()
        
        return jsonify({
            'message': 'Doctor added successfully',
            'doctor': doctor.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500