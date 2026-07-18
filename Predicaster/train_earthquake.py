import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
import joblib

# === Load and clean data ===
df = pd.read_csv('earthquake.csv')

# Drop rows with missing key values
df = df.dropna(subset=['Magnitude', 'Latitude', 'Longitude', 'Depth', 'Time'])

# Extract hour from time
# Convert 'Time' column safely
df['Time'] = pd.to_datetime(df['Time'], errors='coerce', utc=True)
df['Hour'] = df['Time'].dt.hour.fillna(0)


# Features & target
X = df[['Latitude', 'Longitude', 'Depth', 'Hour']]
y = df['Magnitude']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, 'earthquake_scaler.pkl')

X_scaled = np.reshape(X_scaled, (X_scaled.shape[0], 1, X_scaled.shape[1]))

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# === Build LSTM model ===
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(1, X.shape[1])),
    Dropout(0.2),
    LSTM(32, return_sequences=False),
    Dropout(0.2),
    Dense(16, activation='relu'),
    Dense(1) 
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# === Train model ===
early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
history = model.fit(
    X_train, y_train,
    epochs=80,
    batch_size=32,
    validation_split=0.2,
    callbacks=[early_stop],
    verbose=1
)

# === Evaluate model ===
loss, mae = model.evaluate(X_test, y_test)
print(f"Test MAE: {mae:.4f}")

# === Save model ===
model.save('earthquake_lstm_model.h5')
print("✅ LSTM Model and Scaler saved successfully!")
