import pandas as pd
import random

rows = []

for i in range(3500):
    temp = random.randint(35, 85)
    vibration = round(random.uniform(0.2, 1.2), 2)
    rpm = random.randint(250, 350)

    # class distribution: 75% normal, 15% warning, 10% critical
    status = random.choices(
        ["NORMAL", "WARNING", "CRITICAL"],
        weights=[0.75, 0.15, 0.10]
    )[0]

    rows.append([temp, vibration, rpm, status])

df = pd.DataFrame(rows, columns=["temp", "vibration", "rpm", "overall_status"])
df.to_csv("Ml/synthetic_output/belt_synthetic_3500.csv", index=False)

print("✅ 3500 Synthetic ML Dataset Created Successfully")
