from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from config import Config

# Import routes
from routes.auth import auth_bp
from routes.patients import patients_bp
from routes.doctors import doctors_bp
from routes.appointments import appointments_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
jwt = JWTManager(app)
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(patients_bp, url_prefix='/api/patients')
app.register_blueprint(doctors_bp, url_prefix='/api/doctors')
app.register_blueprint(appointments_bp, url_prefix='/api/appointments')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'Healthcare API is running'})

@app.route('/api/seed', methods=['POST'])
def seed_data():
    """Seed database with sample data"""
    try:
        # Create admin user
        from models import User, Doctor, Patient
        import bcrypt
        from datetime import datetime
        
        # Check if admin exists
        admin = User.query.filter_by(email='admin@healthcare.com').first()
        if not admin:
            hashed_password = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt())
            admin = User(
                full_name='Admin',
                email='admin@healthcare.com',
                password=hashed_password.decode('utf-8'),
                role='admin'
            )
            db.session.add(admin)
            db.session.flush()
            
            # Create doctors
            doctors_data = [
                {
                    'user_id': admin.id,
                    'specialization': 'Cardiologist',
                    'qualification': 'MD, DM Cardiology',
                    'experience': 10,
                    'bio': 'Expert in heart diseases and cardiovascular conditions',
                    'consultation_fee': 500,
                    'available_days': 'Mon,Wed,Fri',
                    'available_time': '9:00 AM - 5:00 PM'
                },
                {
                    'user_id': admin.id,
                    'specialization': 'Neurologist',
                    'qualification': 'MD, DM Neurology',
                    'experience': 8,
                    'bio': 'Specializes in brain and nervous system disorders',
                    'consultation_fee': 600,
                    'available_days': 'Tue,Thu,Sat',
                    'available_time': '10:00 AM - 4:00 PM'
                },
                {
                    'user_id': admin.id,
                    'specialization': 'Dermatologist',
                    'qualification': 'MD, DVD',
                    'experience': 6,
                    'bio': 'Expert in skin, hair, and nail conditions',
                    'consultation_fee': 400,
                    'available_days': 'Mon,Thu,Sat',
                    'available_time': '11:00 AM - 6:00 PM'
                },
                {
                    'user_id': admin.id,
                    'specialization': 'Orthopedic',
                    'qualification': 'MS Ortho',
                    'experience': 12,
                    'bio': 'Specializes in bone and joint disorders',
                    'consultation_fee': 450,
                    'available_days': 'Mon,Tue,Wed,Thu,Fri',
                    'available_time': '8:00 AM - 3:00 PM'
                }
            ]
            
            for doc_data in doctors_data:
                doctor = Doctor(**doc_data)
                db.session.add(doctor)
            
            db.session.commit()
        
        return jsonify({'message': 'Data seeded successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)