import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# --------------------------
# Paths
# --------------------------
CSV_PATH = "D:/Belt Monitoring System/Ml/belt_dataset_realistic.csv"
MODEL_DIR = "D:/Belt Monitoring System/Ml"
MODEL_FILE = "belt_model.pkl"

# --------------------------
# Threshold function
# --------------------------
def evaluate_status(temp, vibration, rpm):
    score = 0

    if temp > 90:
        score += 2
    elif temp > 70:
        score += 1

    if vibration > 20:
        score += 2
    elif vibration > 10:
        score += 1

    if rpm < 500 or rpm > 2000:
        score += 2
    elif rpm < 800 or rpm > 1500:
        score += 1

    if score >= 4:
        return "CRITICAL"
    elif score >= 2:
        return "WARNING"
    else:
        return "NORMAL"

# --------------------------
# Load dataset
# --------------------------
df = pd.read_csv(CSV_PATH)
X = df[["temp", "vibration", "rpm"]]
y = df["label"]

# --------------------------
# Split train/test
# --------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --------------------------
# Train RandomForestClassifier
# --------------------------
clf = RandomForestClassifier(n_estimators=200, max_depth=8, random_state=42)
clf.fit(X_train, y_train)

# --------------------------
# Evaluate
# --------------------------
y_pred = clf.predict(X_test)
print("\nAccuracy on test set:", accuracy_score(y_test, y_pred))
print("\nClassification report:\n", classification_report(y_test, y_pred))

# --------------------------
# Save model
# --------------------------
os.makedirs(MODEL_DIR, exist_ok=True)
model_path = os.path.join(MODEL_DIR, MODEL_FILE)
joblib.dump(clf, model_path)
print(f"\nTrained model saved at: {model_path}")

# --------------------------
# Optional: compare ML vs threshold
# --------------------------
df["ml_prediction"] = clf.predict(X)
df["threshold_status"] = df.apply(
    lambda row: evaluate_status(row.temp, row.vibration, row.rpm), axis=1
)
matches = (df["ml_prediction"] == df["threshold_status"]).sum()
total = len(df)
print(f"\nML vs Threshold Accuracy on entire dataset: {matches}/{total} = {matches/total*100:.2f}%")
