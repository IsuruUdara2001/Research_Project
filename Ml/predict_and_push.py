import joblib
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import random

# -------------------------
# Load trained model
# -------------------------
model = joblib.load("Ml/belt_model.pkl")

# -------------------------
# Firebase init
# -------------------------
cred = credentials.Certificate("../Backend/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# -------------------------
# Generate new sensor data
# -------------------------
temp = random.randint(35, 85)
vibration = round(random.uniform(0.2, 1.2), 2)
rpm = random.randint(250, 350)

# -------------------------
# ML Prediction
# -------------------------
input_data = pd.DataFrame([{
    "temp": temp,
    "vibration": vibration,
    "rpm": rpm
}])

pred = model.predict(input_data)[0]

print("✅ ML Prediction:", pred)

# -------------------------
# Build reading
# -------------------------
reading = {
    "temp": temp,
    "vibration": vibration,
    "rpm": rpm,
    "overall_status": pred,
    "source": "ML_MODEL",
    "timestamp": firestore.SERVER_TIMESTAMP
}

# -------------------------
# Push to Firebase
# -------------------------
db.collection("history").add(reading)
db.collection("latest_readings").document("current").set(reading)

print("✅ Prediction pushed to Firebase")
