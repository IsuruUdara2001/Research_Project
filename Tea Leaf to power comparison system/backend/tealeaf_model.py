import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset
df = pd.read_csv("tea_yield_dataset.csv")

# Target column (what we want to predict)
y = df["powder_weight_kg"]

# Features to use (you can adjust later)
features = [
    "leaf_weight_kg",
    "leaf_moisture_percent",
    "withering_time_hours",
    "fermentation_time_hours",
    "drying_temperature_celsius",
    "drying_duration_minutes",
    "ambient_temperature_celsius",
    "humidity_percentage",
    "rainfall_mm",
    "season",
    "collection_region",
]

X = df[features]

# Separate numeric + categorical
numeric_features = [
    "leaf_weight_kg",
    "leaf_moisture_percent",
    "withering_time_hours",
    "fermentation_time_hours",
    "drying_temperature_celsius",
    "drying_duration_minutes",
    "ambient_temperature_celsius",
    "humidity_percentage",
    "rainfall_mm",
]

categorical_features = ["season", "collection_region"]

# Preprocess
preprocess = ColumnTransformer(
    transformers=[
        ("num", "passthrough", numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ]
)

# Pipeline
model = Pipeline(
    steps=[
        ("preprocess", preprocess),
        ("regressor", RandomForestRegressor(n_estimators=200)),
    ]
)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Fit model
model.fit(X_train, y_train)

# Evaluate
score = model.score(X_test, y_test)
print("Model Accuracy (R²):", score)

# Save model
joblib.dump(model, "tealeaf_model.pkl")
print("Model saved as tealeaf_model.pkl")
