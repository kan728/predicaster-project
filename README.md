# 🌍 Predicaster – AI-Powered Disaster Prediction & Management System

Predicaster is an AI-powered disaster prediction and management platform designed to help users monitor and predict potential natural disasters such as **earthquakes, floods, and cyclones**. The system combines machine learning models with an interactive web interface to provide users with disaster-related predictions and information in an accessible and user-friendly way.

## ✨ Features

- 🌊 **Flood Prediction** – Predicts potential flood conditions using historical data and machine learning.
- 🌎 **Earthquake Prediction** – Analyzes historical earthquake data to provide predictions.
- 🌀 **Cyclone Prediction** – Uses historical cyclone data for prediction and analysis.
- 🤖 **AI Chatbot** – Provides users with an interactive interface for disaster-related queries.
- 📊 **Machine Learning Models** – Uses trained ML/LSTM models for disaster prediction.
- 💻 **Interactive Web Interface** – React-based frontend for a responsive and user-friendly experience.
- 🔗 **Flask Backend** – Handles prediction requests and communication between the frontend and machine learning models.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- HTML/CSS

### Backend
- Python
- Flask

### Machine Learning
- Python
- TensorFlow/Keras
- LSTM
- YOLOv5
- NumPy
- Pandas

### Tools & Platforms
- Git & GitHub
- VS Code

## 📁 Project Structure

```text
predicaster-project/
│
├── Predicaster/
│   ├── app.py
│   ├── train_earthquake.py
│   ├── train_flood.py
│   ├── train_hurricane.py
│   ├── earthquake.csv
│   ├── flood.csv
│   ├── cyclone.csv
│   ├── models/
│   ├── templates/
│   ├── static/
│   └── requirements.txt
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   └── assets/
│   ├── package.json
│   └── package-lock.json
│
└── README.md
