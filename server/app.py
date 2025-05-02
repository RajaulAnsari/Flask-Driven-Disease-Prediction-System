from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import pickle
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import jwt
from functools import wraps
import datetime
from flask_mail import Mail, Message
from config import Config
from bson import ObjectId


app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend
app.config.from_object(Config)


mail=Mail(app)
mongo=PyMongo(app)
bcrypt=Bcrypt(app)

# Load the data
precautions = pd.read_csv('data/precautions_df.csv')
workout = pd.read_csv('data/workout_df.csv')
description = pd.read_csv('data/description.csv')
medications = pd.read_csv('data/medications.csv')
diets = pd.read_csv('data/diets.csv')

# Load the model
model = pickle.load(open('models/svc.pkl', 'rb'))
model_medicine=pickle.load(open('models/medicine_model.pkl','rb'))
mergedataset_loaded = pd.read_pickle('./models/DoctorAssign_model.pkl')

# Reversed disease dictionary and symptoms_dict (same as provided)
reversed_disease_dict={0: '(vertigo) Paroymsal  Positional Vertigo', 1: 'AIDS', 2: 'Acne', 3: 'Alcoholic hepatitis', 4: 'Allergy', 5: 'Arthritis', 6: 'Bronchial Asthma', 7: 'Cervical spondylosis', 8: 'Chicken pox', 9: 'Chronic cholestasis', 10: 'Common Cold', 11: 'Dengue', 12: 'Diabetes ', 13: 'Dimorphic hemmorhoids(piles)', 14: 'Drug Reaction', 15: 'Fungal infection', 16: 'GERD', 17: 'Gastroenteritis', 18: 'Heart attack', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 23: 'Hypertension ', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 26: 'Hypothyroidism', 27: 'Impetigo', 28: 'Jaundice', 29: 'Malaria', 30: 'Migraine', 31: 'Osteoarthristis', 32: 'Paralysis (brain hemorrhage)', 33: 'Peptic ulcer diseae', 34: 'Pneumonia', 35: 'Psoriasis', 36: 'Tuberculosis', 37: 'Typhoid', 38: 'Urinary tract infection', 39: 'Varicose veins', 40: 'hepatitis A'}
symptoms_dict={'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131}

# Prediction helper
def get_predected_diseases(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        if item in symptoms_dict:
            input_vector[symptoms_dict[item]] = 1
    pred_index = model.predict([input_vector])[0]
    return reversed_disease_dict[pred_index]

# Retrieve all info
def getEverything(pred_disease):
    descript = description[description['Disease'] == pred_disease]['Description']
    descript = " ".join([d for d in descript])

    precut = precautions[precautions['Disease'] == pred_disease][
        ['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']
    ].values.tolist()

    med = medications[medications['Disease'] == pred_disease]['Medication'].tolist()
    die = diets[diets['Disease'] == pred_disease]['Diet'].tolist()
    wrkout = workout[workout['disease'] == pred_disease]['workout'].tolist()

    return descript, precut[0] if precut else [], med, die, wrkout

# Decorator to verify JWT token for protected routes
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({'_id': data['user_id']})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(current_user, *args, **kwargs)

    return decorated_function

# REcommand a medicine
def recommend_medicine(use_query):
    recommendations = []
    # Lowercase the input query
    use_query = [query.lower() for query in use_query] 

    for i, row in model_medicine.iterrows():
        composition_uses = row['composition_uses'].lower()
        if all(query in composition_uses for query in use_query):
            recommendations.append([row['Medicine Name'], row['Medicine Score Review'],row['Image URL']])

    if recommendations:
        sorted_recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)[:1]
        seen = set()
        recommended_medicines = [x for x in sorted_recommendations if tuple(x) not in seen and not seen.add(tuple(x))]
        return recommended_medicines
    else:
        return "No medicines found for this disease."

def recommend_doctor1(disease_input):
    disease_input = disease_input.strip().lower()
    
    # Find specialist for the disease
    row = mergedataset_loaded[mergedataset_loaded['Disease'].str.strip().str.lower() == disease_input]
    
    if row.empty:
        return "No specialist found for this disease."
    
    specialist = row.iloc[0]['Specialist']

    # Find all matching doctors
    matched_doctors = mergedataset_loaded[
        mergedataset_loaded['Specialist'].str.strip().str.lower() == specialist.lower()
    ]
    matched_doctors = matched_doctors.sort_values(by='SATISFACTION', ascending=False)
    
    if matched_doctors.empty:
        return f"No doctors found for specialist: {specialist}"
    
    return matched_doctors[['Name', 'Specialist', 'QUALIFICATIONS', 'SATISFACTION']]

@app.route('/api/doctor', methods=['POST'])
def doctors():
    try:
        data = request.get_json()
        disease_input = data.get('predicted_disease')

        if not disease_input or not isinstance(disease_input, str):
            return jsonify({
                'success': False,
                'message': 'Invalid input: Please provide a disease name as a string.'
            }), 400

        recommended_doctors = recommend_doctor1(disease_input)

        if isinstance(recommended_doctors, str):
            return jsonify({
                'success': False,
                'message': recommended_doctors
            }), 404

        formatted_doctors = []
        for _, row in recommended_doctors.iterrows():
            formatted_doctors.append({
                'name': row['Name'],
                'specialist': row['Specialist'],
                'qualifications': row['QUALIFICATIONS'],
                'satisfaction': row['SATISFACTION']
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

    report_data = []
    for prediction in predictions:
        report_data.append({
            'symptoms': prediction.get('symptoms', []),
            'predicted_disease': prediction.get('predicted_disease', 'N/A'),
            'description': prediction.get('description', 'No description available'),
            'precautions': prediction.get('precautions', []),
            'medications': prediction.get('medications', []),
            'diets': prediction.get('diets', []),
            'workouts': prediction.get('workouts', []),
            'datetime': prediction.get('datetime', 'No date available')
        })

    if not report_data:
        return jsonify({'message': 'No reports found for this user'}), 404

    return jsonify({'user_id': user_id, 'predictions': report_data}), 200


@app.route('/api/admin/all-predictions', methods=['GET'])
def get_add_prediction():
    predictions = list(mongo.db.predictions.find({}))

    for pred in predictions:
        pred['_id'] = str(pred['_id'])

        user_id = pred.get('user_id')
        if user_id:
            try:
                # Convert string user_id to ObjectId before querying
                user_obj_id = ObjectId(user_id)
                user = mongo.db.users.find_one({"_id": user_obj_id})

                if user:
                    pred['username'] = user.get('username', 'Unknown')
                else:
                    pred['username'] = 'Unknown (user not found)'
            except Exception as e:
                print(f"[ERROR] Invalid ObjectId: {user_id} -> {e}")
                pred['username'] = 'Unknown (invalid ID)'
        else:
            pred['username'] = 'Unknown (no user_id)'

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

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
