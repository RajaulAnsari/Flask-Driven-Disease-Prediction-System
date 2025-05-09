import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

// Define the symptom dictionary
const symptoms_dict = {
  itching: 0,
  skin_rash: 1,
  nodal_skin_eruptions: 2,
  continuous_sneezing: 3,
  shivering: 4,
  chills: 5,
  joint_pain: 6,
  stomach_pain: 7,
  acidity: 8,
  ulcers_on_tongue: 9,
  muscle_wasting: 10,
  vomiting: 11,
  burning_micturition: 12,
  spotting_urination: 13,
  fatigue: 14,
  weight_gain: 15,
  anxiety: 16,
  cold_hands_and_feets: 17,
  mood_swings: 18,
  weight_loss: 19,
  restlessness: 20,
  lethargy: 21,
  patches_in_throat: 22,
  irregular_sugar_level: 23,
  cough: 24,
  high_fever: 25,
  sunken_eyes: 26,
  breathlessness: 27,
  sweating: 28,
  dehydration: 29,
  indigestion: 30,
  headache: 31,
  yellowish_skin: 32,
  dark_urine: 33,
  nausea: 34,
  loss_of_appetite: 35,
  pain_behind_the_eyes: 36,
  back_pain: 37,
  constipation: 38,
  abdominal_pain: 39,
  diarrhoea: 40,
  mild_fever: 41,
  yellow_urine: 42,
  yellowing_of_eyes: 43,
  acute_liver_failure: 44,
  fluid_overload: 45,
  swelling_of_stomach: 46,
  swelled_lymph_nodes: 47,
  malaise: 48,
  blurred_and_distorted_vision: 49,
  phlegm: 50,
  throat_irritation: 51,
  redness_of_eyes: 52,
  sinus_pressure: 53,
  runny_nose: 54,
  congestion: 55,
  chest_pain: 56,
  weakness_in_limbs: 57,
  fast_heart_rate: 58,
  pain_during_bowel_movements: 59,
  pain_in_anal_region: 60,
  bloody_stool: 61,
  irritation_in_anus: 62,
  neck_pain: 63,
  dizziness: 64,
  cramps: 65,
  bruising: 66,
  obesity: 67,
  swollen_legs: 68,
  swollen_blood_vessels: 69,
  puffy_face_and_eyes: 70,
  enlarged_thyroid: 71,
  brittle_nails: 72,
  swollen_extremeties: 73,
  excessive_hunger: 74,
  extra_marital_contacts: 75,
  drying_and_tingling_lips: 76,
  slurred_speech: 77,
  knee_pain: 78,
  hip_joint_pain: 79,
  muscle_weakness: 80,
  stiff_neck: 81,
  swelling_joints: 82,
  movement_stiffness: 83,
  spinning_movements: 84,
  loss_of_balance: 85,
  unsteadiness: 86,
  weakness_of_one_body_side: 87,
  loss_of_smell: 88,
  bladder_discomfort: 89,
  foul_smell_of_urine: 90,
  continuous_feel_of_urine: 91,
  passage_of_gases: 92,
  internal_itching: 93,
  "toxic_look_(typhos)": 94,
  depression: 95,
  irritability: 96,
  muscle_pain: 97,
  altered_sensorium: 98,
  red_spots_over_body: 99,
  belly_pain: 100,
  abnormal_menstruation: 101,
  dischromic_patches: 102,
  watering_from_eyes: 103,
  increased_appetite: 104,
  polyuria: 105,
  family_history: 106,
  mucoid_sputum: 107,
  rusty_sputum: 108,
  lack_of_concentration: 109,
  visual_disturbances: 110,
  receiving_blood_transfusion: 111,
  receiving_unsterile_injections: 112,
  coma: 113,
  stomach_bleeding: 114,
  distention_of_abdomen: 115,
  history_of_alcohol_consumption: 116,
  "fluid_overload.1": 117,
  blood_in_sputum: 118,
  prominent_veins_on_calf: 119,
  palpitations: 120,
  painful_walking: 121,
  pus_filled_pimples: 122,
  blackheads: 123,
  scurring: 124,
  skin_peeling: 125,
  silver_like_dusting: 126,
  small_dents_in_nails: 127,
  inflammatory_nails: 128,
  blister: 129,
  red_sore_around_nose: 130,
  yellow_crust_ooze: 131,
};

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [medicines, setMedicines] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symptomList = symptoms.split(",").map((s) => s.trim());

    setLoading(true);
    setError("");
    setResult(null);
    setMedicines(null);
    setDoctors(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: symptomList, token: token }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);

        const medicineResponse = await fetch(
          "http://127.0.0.1:5000/api/medicine",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              predicted_disease: [data.predicted_disease],
              token: token,
            }),
          }
        );

        const medicineData = await medicineResponse.json();

        if (medicineResponse.ok) {
          setMedicines(medicineData.recommended_medicines);
        } else {
          setError(medicineData.message || "No medicines found.");
        }

        const doctorResponse = await fetch("http://127.0.0.1:5000/api/doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            predicted_disease: data.predicted_disease,
            token: token,
          }),
        });

        const doctorData = await doctorResponse.json();

        if (doctorResponse.ok) {
          setDoctors(doctorData.recommended_doctors);
        } else {
          setError(
            doctorData.message ||
              "Currently no doctors available — we are working on that!"
          );
        }
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSymptoms(inputValue);

    const lastSymptom = inputValue.split(",").pop().trim();
    const filteredSuggestions = Object.keys(symptoms_dict).filter(
      (symptom) =>
        symptom.toLowerCase().includes(lastSymptom.toLowerCase()) && lastSymptom
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSymptoms((prev) => {
      const lastCommaIndex = prev.lastIndexOf(",");
      const newInput =
        lastCommaIndex >= 0 ? prev.slice(0, lastCommaIndex + 1) : "";
      return newInput + suggestion;
    });
    setSuggestions([]);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Disease Prediction & Medicine Recommendation</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter symptoms, comma separated"
            value={symptoms}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="list-group mb-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {result && (
          <div className="mt-4">
            <h4 className="mb-3 text-success">
              Predicted Disease: <strong>{result.predicted_disease}</strong>
            </h4>
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th>Description</th>
                  <td>{result.description}</td>
                </tr>
                <tr>
                  <th>Precautions</th>
                  <td>{result.precautions.join(", ")}</td>
                </tr>
                <tr>
                  <th>Medications</th>
                  <td>{result.medications.join(", ")}</td>
                </tr>
                <tr>
                  <th>Diet</th>
                  <td>{result.diets.join(", ")}</td>
                </tr>
                <tr>
                  <th>Workout</th>
                  <td>{result.workouts.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {medicines && (
          <div className="mt-4">
            <h4 className="mb-3 text-info">Recommended Medicines</h4>
            <ul>
              {medicines.map((medicine, index) => (
                <li key={index}>
                  <img
                    src={medicine.medicine_image_url}
                    alt="medicine"
                    width=""
                    style={{ marginRight: "10px" }}
                  />
                  <br />
                  <strong>{medicine.medicine_name}</strong> -{" "}
                  {medicine.medicine_score}⭐
                </li>
              ))}
            </ul>
          </div>
        )}

        {doctors && doctors.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-3 text-info">Recommended Doctors</h4>
            <div className="row">
              {doctors
                .filter(
                  (doc, index, self) =>
                    index ===
                    self.findIndex(
                      (d) =>
                        d.name === doc.name && d.specialist === doc.specialist
                    )
                ) // Remove duplicates based on name and specialist
                .map((doc, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{doc.name}</h5>
                        <p className="card-text">
                          <strong>Specialist:</strong> {doc.specialist}
                          <br />
                          <strong>Qualifications:</strong> {doc.qualifications}
                          <br />
                          <strong>Satisfaction:</strong> {doc.satisfaction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SymptomsChecker;
