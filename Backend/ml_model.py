import joblib
import pandas as pd
import os

# ----------------------------
# Load the trained ML model
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "Ml", "belt_model.pkl")  # adjust path if needed

# Load the model
model = joblib.load(MODEL_PATH)

# ----------------------------
# Prediction function
# ----------------------------
def predict_belt(temp, vibration, rpm):
    """
    Predict belt status using the trained ML model.

    Args:
        temp (float): Temperature reading
        vibration (float): Vibration reading
        rpm (float): RPM reading

    Returns:
        str: "NORMAL", "WARNING", or "CRITICAL"
    """
    # Create a DataFrame with one row
    data = pd.DataFrame([{
        "temp": temp,
        "vibration": vibration,
        "rpm": rpm
    }])

    # Make prediction
    prediction = model.predict(data)[0]
    return prediction

# ----------------------------
# Optional quick test
# ----------------------------
if __name__ == "__main__":
    print(predict_belt(30, 0.2, 300))   # Expected: NORMAL
    print(predict_belt(60, 1.5, 800))   # Expected: WARNING
    print(predict_belt(85, 4.0, 1500))  # Expected: CRITICAL
