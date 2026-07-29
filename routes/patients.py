from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Patient, User

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_patient_profile():
    try:
        user_id = get_jwt_identity()
        patient = Patient.query.filter_by(user_id=user_id).first()
        
        if not patient:
            return jsonify({'message': 'Patient profile not found'}), 404
        
        return jsonify({'patient': patient.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@patients_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_patient_profile():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        patient = Patient.query.filter_by(user_id=user_id).first()
        if not patient:
            return jsonify({'message': 'Patient profile not found'}), 404
        
        # Update fields
        if data.get('date_of_birth'):
            patient.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        if data.get('gender'):
            patient.gender = data['gender']
        if data.get('blood_group'):
            patient.blood_group = data['blood_group']
        if data.get('address'):
            patient.address = data['address']
        if data.get('emergency_contact'):
            patient.emergency_contact = data['emergency_contact']
        if data.get('medical_history'):
            patient.medical_history = data['medical_history']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Patient profile updated successfully',
            'patient': patient.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500