import requests
import random
import time

URL = "http://127.0.0.1:5000/ingest"

print("🚀 Realistic Data Simulator Started (CTRL + C to stop)")

def send(temp, vibration, rpm, label):
    data = {
        "temp": round(temp, 2),
        "vibration": round(vibration, 2),
        "rpm": rpm
    }

    try:
        res = requests.post(URL, json=data)
        print(f"[{label}] →", data, "=>", res.json())
    except Exception as e:
        print("❌ Error:", e)

try:
    while True:

        # 🟢 ALL NORMAL
        for _ in range(4):
            send(
                temp=random.uniform(35, 45),
                vibration=random.uniform(0.3, 0.8),
                rpm=random.randint(1100, 1400),
                label="ALL NORMAL"
            )
            time.sleep(2)

        # 🟡 TEMP WARNING ONLY
        for _ in range(3):
            send(
                temp=random.uniform(58, 65),        # warning
                vibration=random.uniform(0.4, 0.9), # normal
                rpm=random.randint(1100, 1400),     # normal
                label="TEMP WARNING"
            )
            time.sleep(2)

        # 🔴 TEMP CRITICAL ONLY
        for _ in range(2):
            send(
                temp=random.uniform(72, 85),        # critical
                vibration=random.uniform(0.5, 1.0), # normal
                rpm=random.randint(1100, 1400),     # normal
                label="TEMP CRITICAL"
            )
            time.sleep(2)

        # 🟡 VIBRATION WARNING ONLY
        for _ in range(3):
            send(
                temp=random.uniform(38, 45),        # normal
                vibration=random.uniform(1.6, 2.2), # warning
                rpm=random.randint(1100, 1400),     # normal
                label="VIBRATION WARNING"
            )
            time.sleep(2)

        # 🔴 RPM CRITICAL ONLY
        for _ in range(2):
            send(
                temp=random.uniform(38, 45),        # normal
                vibration=random.uniform(0.4, 0.9), # normal
                rpm=random.randint(200, 450),       # critical
                label="RPM CRITICAL"
            )
            time.sleep(2)

except KeyboardInterrupt:
    print("\n🛑 Simulator stopped")
