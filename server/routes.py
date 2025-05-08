from flask import request, jsonify
import datetime
from flask_mail import Message
import jwt
from bson import ObjectId
from utils import (
    token_required, get_predected_diseases, getEverything, recommend_medicine,
    symptoms_dict, recommend_doctor
)

def my_routes(app,mongo,mail,bcrypt):
    @app.route('/api/doctor', methods=['POST'])
    def doctors():
        try:
            data = request.get_json()
            disease_input = data.get('predicted_disease')
            token = data.get('token')
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = decoded_token.get('user_id')

            if not disease_input or not isinstance(disease_input, str):
                return jsonify({
                    'success': False,
                    'message': 'Invalid input: Please provide a disease name as a string.'
                }), 400

            recommended_doctors = recommend_doctor(disease_input)

            if isinstance(recommended_doctors, str):
                return jsonify({
                    'success': False,
                    'message': recommended_doctors
                }), 404

            formatted_doctors = []
            seen_doctors = set()  # For tracking duplicates based on name + specialist

            for _, row in recommended_doctors.iterrows():
                unique_key = f"{row['Name'].strip().lower()}|{row['Specialist'].strip().lower()}"
                if unique_key not in seen_doctors:
                    seen_doctors.add(unique_key)
                    formatted_doctors.append({
                        'name': row['Name'],
                        'specialist': row['Specialist'],
                        'qualifications': row['QUALIFICATIONS'],
                        'satisfaction': row['SATISFACTION']
                    })

            # Store in MongoDB
            mongo.db.doctor_pred.insert_one({
                'user_id': user_id,
                'predicted_disease': disease_input,
                'recommended_doctors': formatted_doctors
            })

            return jsonify({
                'success': True,
                'recommended_doctors': formatted_doctors
            }), 200

        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'Error occurred while fetching doctors: {str(e)}'
            }), 500



    @app.route('/api/medicine', methods=['POST'])
    def medicines():
        try:
            # Get the JSON data from the request body
            data = request.get_json()

            # Check if 'predicted_disease' key is present
            use_query = data.get('predicted_disease')
            token=data.get('token')
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = decoded_token.get('user_id')
            if not use_query or not isinstance(use_query, list):
                return jsonify({
                    'success': False,
                    'message': 'Invalid input: Please provide a list of predicted diseases/symptoms.'
                }), 400

            # Get recommended medicines
            recommended_medicines = recommend_medicine(use_query)

            if recommended_medicines == "No medicines found for this disease.":
                return jsonify({
                    'success': False,
                    'message': 'No medicines found for the provided symptoms.'
                }), 404

            # Format the medicine list into nice JSON objects
            formatted_medicines = []
            for med in recommended_medicines:
                formatted_medicines.append({
                    'medicine_name': med[0],
                    'medicine_score': med[1],
                    'medicine_image_url': med[2]
                })
            
            # Store in MongoDB
            mongo.db.medicines_pred.insert_one({
                'user_id':user_id,
                'predicted_disease': use_query,
                'recommended_medicines': formatted_medicines
            })

            return jsonify({
                'success': True,
                'recommended_medicines': formatted_medicines
            }), 200

        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'Error occurred while fetching medicines: {str(e)}'
            }), 500

    # Route for user registration
    @app.route('/api/register', methods=['POST'])
    def register():
        data = request.get_json()
        name = data.get('name')
        username = data.get('email')
        password = data.get('password')

        if not username or not password or not name:
            return jsonify({'message': 'Missing fields'}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Check if user exists
        user = mongo.db.users.find_one({'username': username})
        if user:
            return jsonify({'message': 'User email already exists'}), 400

        # Insert new user into database
        mongo.db.users.insert_one({
            'name': name,
            'username': username,
            'password': hashed_password
        })
        
        # Send confirmation email
        msg = Message(
            'Registration Successful',
            sender=app.config['MAIL_USERNAME'],
            recipients=[username]
        )
        msg.body = f"Hello {name},\n\nYour account has been successfully registered! Welcome to our system.\n\nBest regards,\nThe Team"
        
        try:
            mail.send(msg)
        except Exception as e:
            return jsonify({'message': 'Failed to send confirmation email', 'error': str(e)}), 500
        
        return jsonify({'message': 'User registered successfully'}), 201


    # Route for user login
    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('email')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Missing fields'}), 400

        # Find the user in the database
        user = mongo.db.users.find_one({'username': username})
        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401

        # Check if the password is correct
        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Generate a JWT token
        token = jwt.encode({'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, 
                        app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({'token': token}), 200


    @app.route('/api/reports', methods=['POST'])
    @token_required
    def get_reports_by_user( user_id):
        data = request.get_json()
        token=data.get('token')
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded_token.get('user_id')

        predictions = mongo.db.predictions.find({'user_id': user_id})
        medicines = list(mongo.db.medicines_pred.find({'user_id': user_id}))
        doctors=list(mongo.db.doctor_pred.find({'user_id':user_id}))

        report_data = []
        for prediction in predictions:
            pred_disease = prediction.get('predicted_disease', '')
            
            # Try to find matching medicine entry
            matching_medicine = next(
                (med for med in medicines if pred_disease in med.get('predicted_disease', [])), 
                None
            )
            matching_doctor=next(
                (doctor for doctor in doctors if pred_disease in doctor.get('predicted_disease', [])),
                None
            )
            report_data.append({
                'symptoms': prediction.get('symptoms', []),
                'predicted_disease': prediction.get('predicted_disease', 'N/A'),
                'description': prediction.get('description', 'No description available'),
                'precautions': prediction.get('precautions', []),
                'medications': prediction.get('medications', []),
                'diets': prediction.get('diets', []),
                'workouts': prediction.get('workouts', []),
                'datetime': prediction.get('datetime', 'No date available'),
                'recommended_medicines': matching_medicine.get('recommended_medicines', []) if matching_medicine else [],
                'recommended_doctors': matching_doctor.get('recommended_doctors',[]) if matching_doctor else []
            })


        if not report_data:
            return jsonify({'message': 'No reports found for this user'}), 404

        return jsonify({'user_id': user_id, 'predictions': report_data}), 200


    @app.route('/api/admin/all-predictions', methods=['GET'])
    def get_all_predictions():
        predictions = list(mongo.db.predictions.find({}))
        doctor_preds = list(mongo.db.doctor_pred.find({}))
        medicine_preds = list(mongo.db.medicines_pred.find({}))

        for pred in predictions:
            pred['_id'] = str(pred['_id'])

            # Attach username
            user_id = pred.get('user_id')
            if user_id:
                try:
                    user_obj_id = ObjectId(user_id)
                    user = mongo.db.users.find_one({"_id": user_obj_id})
                    pred['username'] = user.get('username', 'Unknown') if user else 'Unknown (user not found)'
                except Exception as e:
                    print(f"[ERROR] Invalid ObjectId: {user_id} -> {e}")
                    pred['username'] = 'Unknown (invalid ID)'
            else:
                pred['username'] = 'Unknown (no user_id)'

            # Attach recommended_doctors
            pred['recommended_doctors'] = []
            for doc in doctor_preds:
                if doc.get('user_id') == user_id and doc.get('predicted_disease') == pred.get('predicted_disease'):
                    pred['recommended_doctors'] = doc.get('recommended_doctors', [])
                    break  # Assume one match is enough

            # Attach recommended_medicines
            pred['recommended_medicines'] = []
            for med in medicine_preds:
                if med.get('user_id') == user_id and pred.get('predicted_disease') in med.get('predicted_disease', []):
                    pred['recommended_medicines'] = med.get('recommended_medicines', [])
                    break

        return jsonify({'predictions': predictions}), 200



    @app.route('/api/admin/all-users', methods=['GET'])
    def get_add_users():
        users=list(mongo.db.users.find({}))
        for pred in users:
            pred['_id']=str(pred['_id'])
        return jsonify({'predictions':users}),200

    # API Route: Predict disease
    @app.route('/api/predict', methods=['POST'])
    def predict():
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        token=data.get('token')
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded_token.get('user_id')

        if not symptoms:
            return jsonify({'error': 'No symptoms provided'}), 400

        # Validate symptoms
        invalid_symptoms = [s for s in symptoms if s not in symptoms_dict]
        if invalid_symptoms:
            return jsonify({'error': 'Invalid symptoms provided', 'invalid_symptoms': invalid_symptoms}), 400

        try:
            pred_disease = get_predected_diseases(symptoms)
            descript, precut, med, die, wrkout = getEverything(pred_disease)

            response = {
                'predicted_disease': pred_disease,
                'description': descript,
                'precautions': precut,
                'medications': med,
                'diets': die,
                'workouts': wrkout
            }     
            
            mongo.db.predictions.insert_one({
                'user_id':user_id,
                'symptoms':symptoms,
                'predicted_disease': pred_disease,
                'description': descript,
                'precautions': precut,
                'medications': med,
                'diets': die,
                'workouts': wrkout,
                'datetime':datetime.datetime.now()
            })   

            return jsonify(response), 200
        except Exception as e:
            print(f"Prediction Error: {e}")
            return jsonify({'error': 'Internal server error'}), 500

    @app.route('/api/admin/login', methods=['POST'])
    def admin_login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        admin = mongo.db.admin.find_one({'email': email})

        if not admin:
            return jsonify({'error': 'Invalid username or password'}), 401

        # Check if the password is correct
        if not bcrypt.check_password_hash(admin['password'], password):
            return jsonify({'error': 'Invalid username or password'}), 401
        

        token = jwt.encode({
            'admin_id': str(admin['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({'token': token}), 200


    # Default route
    @app.route('/')
    def welcome():
        return "<p>Server is Running</p>"