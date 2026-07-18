from werkzeug.utils import secure_filename
import os
import subprocess
from flask import Flask, jsonify, request, render_template
import numpy as np
import joblib
import pickle
import pandas as pd
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

models = {}
scalers = {}

for file in os.listdir('.'):
    if file.endswith('.keras') or file.endswith('.h5'):
        model_name = file.replace('.keras', '').replace('.h5', '').lower()
        try:
            models[model_name] = load_model(file, compile=False)
            print(f"✅ Loaded LSTM model: {model_name}")
        except Exception as e:
            print(f"⚠️ Could not load model {file}: {e}")

    elif file.endswith('.pkl'):
        scaler_name = file.replace('.pkl', '').lower()
        try:
            scalers[scaler_name] = joblib.load(file)
            print(f"✅ Loaded scaler: {scaler_name}")
        except Exception:
            try:
                with open(file, 'rb') as f:
                    scalers[scaler_name] = pickle.load(f)
                print(f"✅ Loaded scaler via pickle: {scaler_name}")
            except Exception as e:
                print(f"⚠️ Could not load scaler {file}: {e}")

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/download")
def download():
    return render_template('download.html')


@app.route('/earth', methods=['POST'])
def earth():
    data = request.get_json()
    model = models.get('earthquake_lstm_model') or models.get('earthquake')
    scaler = scalers.get('earthquake_scaler')

    if not model or not scaler:
        return jsonify({"error": "❌ Earthquake model/scaler not loaded"}), 500

    try:
        data = {k.lower(): v for k, v in data.items()}

        features = ["latitude", "longitude", "depth", "magnitude"]

        for f in features:
            if f not in data or data[f] in ["", None]:
                return jsonify({"error": f"Missing required input: {f}"}), 400

        X = np.array([[float(data[f]) for f in features]], dtype=float)
        X_scaled = scaler.transform(X)
        X_scaled = X_scaled.reshape((1, 1, len(features)))

        prediction = model.predict(X_scaled)

        return jsonify({"predicted_magnitude": float(prediction[0][0])})

    except Exception as e:
        return jsonify({"error": f"Earthquake prediction failed: {str(e)}"}), 400





@app.route('/flood', methods=['POST'])
def flood():
    data = request.get_json()
    model = models.get('flood_lstm_model') or models.get('flood')
    scaler = scalers.get('flood_scaler')

    if not model or not scaler:
        return jsonify({"error": "❌ Flood model/scaler not loaded"}), 500

    try:
        features = list(scaler.feature_names_in_)
        X = np.array([[float(data[f]) for f in features]], dtype=float)

        X_scaled = scaler.transform(X)
        X_scaled = X_scaled.reshape((1, 1, len(features)))

        prediction = model.predict(X_scaled)
        return jsonify({"predicted_flood_probability": float(prediction[0][0])})
    except KeyError as e:
        return jsonify({"error": f"Missing input field: {e}"}), 400
    except Exception as e:
        return jsonify({"error": f"Flood prediction failed: {e}"}), 400



@app.route('/hurri', methods=['POST'])
def hurri():
    data = request.get_json()
    model = models.get('hurricane_lstm_model') or models.get('cyclone_lstm_model')
    scaler = scalers.get('hurricane_scaler') or scalers.get('cyclone_scaler')

    if not model or not scaler:
        return jsonify({"error": "❌ Hurricane model/scaler not loaded"}), 500

    try:
        features = [
            "Latitude", "Longitude", "MinimumPressure",
            "LowWindNE", "LowWindSE", "LowWindSW", "LowWindNW",
            "ModerateWindNE", "ModerateWindSE", "ModerateWindSW", "ModerateWindNW",
            "HighWindNE", "HighWindSE", "HighWindSW", "HighWindNW"
        ]

        X = pd.DataFrame([data])[features].values

        X_scaled = scaler.transform(X)
        X_scaled = X_scaled.reshape((1, 1, len(features)))

        prediction = model.predict(X_scaled)
        return jsonify({"predicted_maximum_wind_speed": float(prediction[0][0])})

    except KeyError as e:
        return jsonify({"error": f"Missing input field: {e}"}), 400
    except Exception as e:
        return jsonify({"error": f"Hurricane prediction failed: {e}"}), 400



@app.route('/predict/<model_name>', methods=['POST'])
def dynamic_predict(model_name):
    data = request.get_json()
    features = data.get('features')

    model = models.get(model_name.lower())
    scaler = scalers.get(f"{model_name.lower()}_scaler")

    if not model:
        return jsonify({"error": f"❌ Model '{model_name}' not found"}), 404

    try:
        if scaler:
            arr = np.array(features).reshape(1, -1)
            arr_scaled = scaler.transform(arr)
            arr_scaled = arr_scaled.reshape((1, 1, arr_scaled.shape[1]))
            prediction = model.predict(arr_scaled)
        else:
            prediction = model.predict([features])

        return jsonify({"model": model_name, "prediction": float(prediction[0][0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/detect", methods=['POST'])
def detect():
    print("🟢 /detect route hit")

    video = request.files.get('video')
    if not video:
        return "No video file provided", 400

    filename = secure_filename(video.filename)
    video_path = os.path.join('static', filename)
    video.save(video_path)

    try:
        subprocess.run(['python', 'detect.py', '--source', video_path])
    except Exception as e:
        return jsonify({"error": f"Detection failed: {e}"}), 500

    return jsonify({"output_path": video_path})



if __name__ == '__main__':
    app.run(port=5001, debug=False)
