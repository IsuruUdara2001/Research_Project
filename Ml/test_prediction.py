import joblib
import pandas as pd

# Load your trained model
model = joblib.load("Ml/belt_model.pkl")


# Sample test data (you can change values)
sample = pd.DataFrame([{
    "temp": 60,
    "vibration": 0.6,
    "rpm": 300
}])

# Predict
prediction = model.predict(sample)

print("✅ Predicted belt status =", prediction[0])
