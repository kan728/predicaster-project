import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import joblib

# Load dataset
df = pd.read_csv("flood.csv")

# Drop any missing values
df = df.dropna()

# Separate features and target
X = df.drop(columns=['FloodProbability'])
y = df['FloodProbability']

# Normalize input features
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Reshape for LSTM input (samples, timesteps, features)
X_scaled = X_scaled.reshape((X_scaled.shape[0], 1, X_scaled.shape[1]))

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Build LSTM model
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(1, X_scaled.shape[2])),
    Dropout(0.3),
    LSTM(32),
    Dropout(0.2),
    Dense(16, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train model
model.fit(X_train, y_train, epochs=25, batch_size=16, validation_split=0.2)

# Save model and scaler
model.save("flood_lstm_model.h5")
joblib.dump(scaler, "flood_scaler.pkl")

print("✅ Flood LSTM model trained and saved successfully!")
