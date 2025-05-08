import numpy as np
import pandas as pd
import pickle
import jwt
from functools import wraps
from flask import request, jsonify, current_app


mongo=None

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
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
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

def recommend_doctor(disease_input):
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
