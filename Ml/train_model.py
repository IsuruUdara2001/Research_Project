import pandas as pd
import random
from datetime import datetime, timedelta

# --------------------------
# Configuration
# --------------------------
num_samples = 5200

# Date range: Oct 1, 2025 → Dec 28, 2025
start_date = datetime(2025, 10, 1)
end_date = datetime(2025, 12, 28)
date_range_seconds = int((end_date - start_date).total_seconds())

# --------------------------
# Functions to generate values aligned with thresholds
# --------------------------
def gen_normal():
    return {
        "temp": round(random.uniform(30, 70), 2),          # <=70
        "vibration": round(random.uniform(0.2, 10), 2),    # <=10
        "rpm": round(random.uniform(800, 1500)),           # safe range
        "label": "NORMAL"
    }

def gen_warning():
    return {
        "temp": round(random.uniform(70, 90), 2),          # 70–90 triggers warning
        "vibration": round(random.uniform(10, 20), 2),     # 10–20 triggers warning
        "rpm": round(random.choice([700, 1600])),          # slightly out of normal range
        "label": "WARNING"
    }

def gen_critical():
    return {
        "temp": round(random.uniform(90, 100), 2),         # >90 critical
        "vibration": round(random.uniform(20, 30), 2),     # >20 critical
        "rpm": round(random.choice([400, 2200])),          # extreme RPM
        "label": "CRITICAL"
    }

# --------------------------
# Generate dataset
# --------------------------
data = []

# Distribute samples roughly 50% NORMAL, 30% WARNING, 20% CRITICAL
for _ in range(int(num_samples * 0.5)):
    data.append(gen_normal())
for _ in range(int(num_samples * 0.3)):
    data.append(gen_warning())
for _ in range(int(num_samples * 0.2)):
    data.append(gen_critical())

# --------------------------
# Add timestamps randomly in range
# --------------------------
for record in data:
    random_seconds = random.randint(0, date_range_seconds)
    timestamp = start_date + timedelta(seconds=random_seconds)
    record["timestamp"] = timestamp

# --------------------------
# Shuffle dataset
# --------------------------
random.shuffle(data)

# --------------------------
# Save to CSV
# --------------------------
df = pd.DataFrame(data)
csv_file = "belt_dataset_oct_dec_2025.csv"
df.to_csv(csv_file, index=False)

print(f"Dataset generated: {df.shape}")
print(df["label"].value_counts())
print(f"Saved to {csv_file}")
