from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import pandas as pd
import joblib
from PIL import Image
from werkzeug.utils import secure_filename
import tensorflow as tf

app = Flask(__name__)
CORS(app)  # Allow frontend to access the API

# Load the models
model_dir = "models"
tabular_model_path = os.path.join(model_dir, "tabular_model.pkl")
tabular_features_path = os.path.join(model_dir, "tabular_features.pkl")
image_model_path = os.path.join(model_dir, "image_model.h5")

tabular_model = None
tabular_features = None
image_model = None

if os.path.exists(tabular_model_path) and os.path.exists(tabular_features_path):
    tabular_model = joblib.load(tabular_model_path)
    tabular_features = joblib.load(tabular_features_path)
    print("Tabular model loaded!")

if os.path.exists(image_model_path):
    image_model = tf.keras.models.load_model(image_model_path)
    print("Image model loaded!")

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/predict/tabular', methods=['POST'])
def predict_tabular():
    if not tabular_model:
        return jsonify({"error": "Tabular model not trained yet."}), 500

    data = request.json
    if not data:
        return jsonify({"error": "No data provided."}), 400

    try:
        # Create a df with 1 row from the input dict
        # Ensure all columns expected by the model are present
        input_data = {}
        for feature in tabular_features:
            # simple type conversion and fallback
            val = data.get(feature, 0)
            if val == "":
                val = 0
            input_data[feature] = [float(val)]
        
        df = pd.DataFrame.from_dict(input_data)
        
        # Predict
        prediction = tabular_model.predict(df)[0]
        probability = tabular_model.predict_proba(df)[0]
        
        result = {
            "prediction": int(prediction),  # 0 or 1
            "risk_score": float(max(probability) * 100),
            "message": "High Risk of PCOS/PCOD" if prediction == 1 else "Low Risk of PCOS/PCOD"
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict/image', methods=['POST'])
def predict_image():
    if not image_model:
        return jsonify({"error": "Image model not trained yet."}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Preprocess the image
        img = Image.open(filepath).convert("RGB")
        img = img.resize((128, 128))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0) # Add batch dimension

        # Predict
        prediction = image_model.predict(img_array)[0][0]
        # Since classes were ['infected', 'noninfected'] (0=infected, 1=noninfected based on alpha sorting usually)
        # Let's interpret the sigmoid output: Closer to 1 usually means class 1 (noninfected). Closer to 0 means class 0 (infected)
        # We need to make sure about the class order. tensorflow image_dataset_from_directory sorts classes alphanumerically.
        # 'infected' -> 0, 'noninfected' -> 1
        
        is_infected = prediction < 0.5
        risk_score = (1 - prediction) * 100 if is_infected else (1 - prediction) * 100 # actually risk of infected is (1-prediction)*100
        # let's format it: 1 is Normal, 0 is PCOS
        risk = (1.0 - prediction) * 100
        
        result = {
            "prediction": 1 if is_infected else 0, # Map to Tabular's 1 for PCOS, 0 for Normal
            "risk_score": float(risk),
            "message": "High Risk based on Ultrasound" if is_infected else "Ultrasound appears normal"
        }
        
        os.remove(filepath) # Clean up
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict/combined', methods=['POST'])
def predict_combined():
    try:
        clinical_data = {}
        image_result = {"prediction": 0, "risk_score": 50.0} # Default
        
        # 1. Extract data based on Content-Type
        if request.is_json:
            data = request.json
            # Basic mapping from simple assessment
            clinical_data = {
                "Age (yrs)": data.get("age", 25),
                "BMI": data.get("bmi", 22),
                "Cycle(R/I)": 2 if data.get("cycle", 28) <= 35 else 4,
                "Waist:Hip Ratio": data.get("ratio", 1.0)
            }
        elif 'clinical_data' in request.form:
            import json
            clinical_data = json.loads(request.form.get('clinical_data', '{}'))
            
            # Handle image if present
            if 'file' in request.files:
                file = request.files['file']
                if file.filename != '':
                    # Reuse image prediction logic
                    filename = secure_filename(file.filename)
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    
                    if image_model:
                        img = Image.open(filepath).convert("RGB")
                        img = img.resize((128, 128))
                        img_array = np.array(img) / 255.0
                        img_array = np.expand_dims(img_array, axis=0)
                        prediction = image_model.predict(img_array)[0][0]
                        
                        is_infected = prediction < 0.5
                        risk = (1.0 - prediction) * 100
                        image_result = {"prediction": 1 if is_infected else 0, "risk_score": float(risk)}
                    
                    os.remove(filepath)

        # 2. Get Tabular Prediction
        tabular_pred = 0
        tabular_risk = 50.0
        
        if tabular_model and tabular_features:
            input_data = {}
            for feature in tabular_features:
                # Try multiple possible keys (some have spaces, some don't)
                val = clinical_data.get(feature)
                if val is None:
                    # try stripping spaces
                    stripped = feature.strip()
                    val = clinical_data.get(stripped)
                
                if val is None:
                    val = 0
                
                try:
                    input_data[feature] = [float(val)]
                except:
                    input_data[feature] = [0.0]
            
            df = pd.DataFrame.from_dict(input_data)
            tabular_pred = int(tabular_model.predict(df)[0])
            prob = tabular_model.predict_proba(df)[0]
            tabular_risk = float(max(prob) * 100) if tabular_pred == 1 else float(min(prob) * 100)
        else:
            # Mock logic if model not loaded
            bmi = float(clinical_data.get("BMI", 22))
            ratio = float(clinical_data.get("Waist:Hip Ratio", 1.0))
            tabular_risk = 75.0 if (bmi > 25 or ratio > 1.2) else 25.0
            tabular_pred = 1 if tabular_risk > 50 else 0

        # 3. Combine results
        final_score = (tabular_risk * 0.6) + (image_result["risk_score"] * 0.4)
        
        diagnosis = "PCOS" if final_score > 60 else ("PCOD" if final_score > 40 else "Normal")
        
        return jsonify({
            "diagnosis": diagnosis,
            "confidence": round(final_score, 2),
            "risk_score": round(final_score, 2),
            "tabular_risk": round(tabular_risk, 2),
            "image_risk": round(image_result["risk_score"], 2),
            "message": f"Analysis complete. Detected condition: {diagnosis}"
        })

    except Exception as e:
        print(f"Error in combined prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
