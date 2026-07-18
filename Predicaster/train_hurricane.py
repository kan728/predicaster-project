import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import joblib

# Load dataset
df = pd.read_csv("cyclone.csv")

# Drop irrelevant or non-numeric columns
df = df.drop(columns=['ID', 'Name', 'Date', 'Time', 'Event', 'Status'], errors='ignore')

# Convert latitude/longitude from strings like "28.0N" / "94.8W" to numeric
def convert_lat_lon(val):
    if isinstance(val, str):
        val = val.strip()
        if val[-1] in ['N', 'S', 'E', 'W']:
            num = float(val[:-1])
            if val[-1] in ['S', 'W']:
                num = -num
            return num
    return float(val)

df['Latitude'] = df['Latitude'].apply(convert_lat_lon)
df['Longitude'] = df['Longitude'].apply(convert_lat_lon)

# Replace missing (-999 or NaN) with median
df.replace(-999, np.nan, inplace=True)
df = df.fillna(df.median())

# Target variable — you can modify this as per your use case.
# Here we assume we’re predicting "Maximum Wind" as the target.
X = df.drop(columns=['Maximum Wind'])
y = df['Maximum Wind']

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
    Dense(1)  # Regression output
])

model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mae'])

# Train model
model.fit(X_train, y_train, epochs=25, batch_size=16, validation_split=0.2)

# Save model and scaler
model.save("hurricane_lstm_model.h5")
joblib.dump(scaler, "hurricane_scaler.pkl")

print("✅ Hurricane LSTM model trained and saved successfully!")
