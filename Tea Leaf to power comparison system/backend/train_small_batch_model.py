import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# =========================
# 1. LOAD DATASET
# =========================
df = pd.read_csv("tea_yield_dataset.csv")

print("Total rows before filtering:", len(df))

# =========================
# 2. FILTER SMALL BATCHES (≤ 250 kg)
# =========================
df = df[df["leaf_weight_kg"] <= 250]

print("Rows after small-batch filter:", len(df))

# =========================
# 3. CREATE TARGET: YIELD %
# =========================
df["yield_percent"] = (
    df["powder_weight_kg"] / df["leaf_weight_kg"]
) * 100

# =========================
# 4. SELECT FEATURES
# =========================
features = [
    "leaf_weight_kg",
    "ambient_temperature_celsius",
    "humidity_percentage",
    "rainfall_mm",
]

X = df[features]
y = df["yield_percent"]

# =========================
# 5. TRAIN / TEST SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# 6. TRAIN MODEL
# =========================
small_batch_model = GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=3,
    random_state=42
)

small_batch_model.fit(X_train, y_train)

# =========================
# 7. EVALUATE MODEL
# =========================
y_pred = small_batch_model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Small Batch Model Evaluation")
print("-----------------------------")
print("MAE:", round(mae, 2))
print("R² Score:", round(r2, 3))

# =========================
# 8. SAVE MODEL
# =========================
joblib.dump(small_batch_model, "small_batch_model.pkl")
print("✅ small_batch_model.pkl saved successfully")
