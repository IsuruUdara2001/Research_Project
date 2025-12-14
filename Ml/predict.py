import joblib
import pandas as pd

# Load the saved model
model = joblib.load("Ml/belt_model.pkl")

# Correct feature names
new_data = pd.DataFrame([{
    "temp": 38.0,        # temperature in °C
    "vibration": 0.65,   # match the trained model
    "rpm": 310           # motor RPM
}])

# Make prediction
prediction = model.predict(new_data)
print("Predicted alert:", prediction[0])
