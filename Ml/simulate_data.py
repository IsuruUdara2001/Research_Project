
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import random

# ------------------------------
# Initialize Firebase
# ------------------------------
cred = credentials.Certificate("D:\\BeltMonitoring\\Backend\\serviceAccountKey.json")  
firebase_admin.initialize_app(cred)
db = firestore.client()

# ------------------------------
# Threshold logic (INDUSTRIAL ACCURATE)
# ------------------------------

def get_temp_status(t):
    if t < 50:
        return "Normal"
    elif t < 70:
        return "Warning"
    else:
        return "Critical"

def get_vibration_status(v):
    if v < 0.45:
        return "Normal"
    elif v < 0.7:
        return "Warning"
    else:
        return "Critical"

def get_rpm_status(r):
    if 290 <= r <= 320:
        return "Normal"
    elif r < 260 or r > 340:
        return "Critical"
    else:
        return "Warning"

def get_overall_status(temp_s, vib_s, rpm_s):
    if "Critical" in [temp_s, vib_s, rpm_s]:
        return "CRITICAL"
    if "Warning" in [temp_s, vib_s, rpm_s]:
        return "WARNING"
    return "NORMAL"

# ------------------------------
# Generate 200 realistic readings
# ------------------------------

for i in range(200):
    # realistic industrial ranges
    temp = random.randint(35, 85) 
    vibration = round(random.uniform(0.2, 1.2), 2)
    rpm = random.randint(250, 350)

    temp_status = get_temp_status(temp)
    vib_status = get_vibration_status(vibration)
    rpm_status = get_rpm_status(rpm)

    overall = get_overall_status(temp_status, vib_status, rpm_status)

    reading = {
        "temp": temp,
        "vibration": vibration,
        "rpm": rpm,
        "temp_status": temp_status,
        "vibration_status": vib_status,
        "rpm_status": rpm_status,
        "overall_status": overall,
        "timestamp": firestore.SERVER_TIMESTAMP
    }

    # store in history
    db.collection("history").add(reading)

    # update latest reading
    db.collection("latest_readings").document("current").set(reading)

print("✅ 200 Industrial-Accurate Readings Added Successfully")
