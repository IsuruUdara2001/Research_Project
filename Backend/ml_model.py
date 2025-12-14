# ml_model.py
import joblib
import os

# Absolute path to the model
MODEL_PATH = r"D:\BeltMonitoring\Ml\belt_model.pkl"  # <-- correct path
model = joblib.load(MODEL_PATH)

def predict_alert(data):
    values = [[data["temp"], data["vibration"], data["rpm"]]]
    prediction = model.predict(values)[0]  # already string
    return prediction
