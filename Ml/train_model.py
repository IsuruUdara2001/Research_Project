# train_model.py (FINAL VERSION)

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
import os

# -------------------------------------
# Load synthetic dataset
# -------------------------------------
SYNTHETIC_PATH = "Ml/synthetic_output/belt_synthetic_3500.csv"
REAL_DATA_PATH = "Ml/real_data/real_450.csv"

df = pd.read_csv(SYNTHETIC_PATH)
print(f"Loaded synthetic data: {df.shape[0]} rows")

# -------------------------------------
# Try to load your real 450 data
# -------------------------------------
if os.path.exists(REAL_DATA_PATH):
    df_real = pd.read_csv(REAL_DATA_PATH)
    
    # Ensure same columns
    df_real = df_real[["temp", "vibration", "rpm", "overall_status"]]
    
    df = pd.concat([df, df_real], ignore_index=True)
    print(f"Loaded real data: {df_real.shape[0]} rows")
else:
    print("⚠ No real data found, training with synthetic only.")

# -------------------------------------
# ML Training
# -------------------------------------
X = df[["temp", "vibration", "rpm"]]
y = df["overall_status"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(
    n_estimators=200,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

# -------------------------------------
# Evaluation
# -------------------------------------
y_pred = model.predict(X_test)
print("\n=== Classification Report ===")
print(classification_report(y_test, y_pred))

# -------------------------------------
# Save model
# -------------------------------------
joblib.dump(model, "Ml/belt_model.pkl")
print("\n✅ Model saved as Ml/belt_model.pkl")
