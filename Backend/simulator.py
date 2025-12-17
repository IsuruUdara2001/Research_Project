import time
import random
import requests

URL = "http://127.0.0.1:5000/ingest"

print("🚀 Data Simulator Started (CTRL + C to stop)")

while True:
    data = {
        "temp": round(random.uniform(30, 85), 2),        # °C
        "vibration": round(random.uniform(0.3, 3.5), 2), # g
        "rpm": random.randint(300, 1200)                 # RPM
    }

    try:
        response = requests.post(URL, json=data)
        print("📤 Sent:", data)
        print("📥 Server:", response.json())
    except Exception as e:
        print("❌ Error:", e)

    time.sleep(3)  # send data every 3 seconds
