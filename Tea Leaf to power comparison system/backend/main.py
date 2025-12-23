from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from firebase_config import db
from datetime import datetime
from typing import List
import joblib
import pandas as pd
import requests
from uuid import uuid4
from fastapi import Body
from weight_routes import router as weight_router





app = FastAPI() 

app.include_router(weight_router)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BatchCollection(BaseModel):
    farmer_id: str
    farmer_name: str
    village_location: str
    leaf_weight: float

class BatchCreate(BaseModel):
    collections: List[BatchCollection]

class LeafRecord(BaseModel):
    farmer_id: str
    leaf_weight: float

class PredictRequest(BaseModel):
    leaf_weight_kg: float

# Load model
try:
    large_model  = joblib.load("tealeaf_model.pkl")
    print("ML Model Loaded!")
except Exception as e:
    print("Error loading model:", e)
    model = None

try:
    small_model = joblib.load("small_batch_model.pkl")
    print("Small batch model loaded")
except Exception as e:
    print("Small model load error:", e)
    small_model = None




@app.get("/api/leaf")
def get_leaf_records():
    snapshot = db.collection("leaf").get()
    result = []
    for doc in snapshot:
        data = doc.to_dict()
        if "timestamp" in data and isinstance(data["timestamp"], datetime):
            data["timestamp"] = data["timestamp"].isoformat()
        result.append(data)
    return result

@app.post("/api/leaf")
def add_leaf_record(record: LeafRecord):
    farmer_id = record.farmer_id
    leaf_weight = record.leaf_weight

    farmer_ref = db.collection("farmers").document(farmer_id).get()
    if not farmer_ref.exists:
        raise HTTPException(status_code=404, detail="Farmer ID not found")
    farmer_data = farmer_ref.to_dict()
    farmer_name = farmer_data.get("farmer_name", "Unknown")
    village_location = farmer_data.get("village_location", "Unknown")

    leaf_id = f"LEAF-{uuid4().hex[:8].upper()}"
    db.collection("leaf").document(leaf_id).set({
        "leaf_id": leaf_id,
        "farmer_id": farmer_id,
        "farmer_name": farmer_name,
        "village_location": village_location,
        "leaf_weight": leaf_weight,
        "timestamp": datetime.now()
    })

    return {"message": "Leaf record added successfully", "leaf_id": leaf_id}


@app.post("/api/createBatch")
def create_batch(batch: BatchCreate):
    if not batch.collections:
        raise HTTPException(status_code=400, detail="No collections provided")

    batch_id = f"BATCH-{datetime.utcnow().year}-{int(datetime.utcnow().timestamp()*1000)}"
    total_weight = sum(c.leaf_weight for c in batch.collections)

    # 🔥 ML PREDICTION
    weather = get_weather_data()

    X = {
        "leaf_weight_kg": total_weight,
        "leaf_moisture_percent": 78,
        "withering_time_hours": 16,
        "fermentation_time_hours": 16,
        "drying_temperature_celsius": 90,
        "drying_duration_minutes": 45,
        "ambient_temperature_celsius": weather["temp_c"],
        "humidity_percentage": weather["humidity"],
        "rainfall_mm": weather["precip_mm"],
        "season": "Intermediate",
        "collection_region": "Upper_Division"
    }

    df = pd.DataFrame([X])
    predicted_output = round(float(model.predict(df)[0]), 2)
    expected_yield = round((predicted_output / total_weight) * 100, 2)

    new_batch = {
        "id": batch_id,
        "startTime": datetime.utcnow().isoformat(),
        "status": "Processing",
        "collections": [c.dict() for c in batch.collections],
        "totalWeight": total_weight,

        # ✅ STORED ONCE
        "predictedOutput": predicted_output,
        "expectedYield": expected_yield,

        "isProcessing": True,
    }

    db.collection("batches").document(batch_id).set(new_batch)
    return {"message": "Batch created", "batch": new_batch}



@app.get("/api/activeBatches")
def get_active_batches():
    snapshot = db.collection("batches").get()
    return [doc.to_dict() for doc in snapshot]


@app.post("/api/updateBatchStatus/{batch_id}")
def update_batch_status(batch_id: str, status: str = Body(...)):
    doc_ref = db.collection("batches").document(batch_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Batch not found")
    
    is_processing = True if status.lower() == "processing" else False

    doc_ref.update({
        "status": status,
        "isProcessing": is_processing
    })
    return {"message": f"Batch status updated to {status}"}











# Weather API constants
WEATHER_API_KEY = "994f61d990ff481f888112805252211"
BADULLA_LAT = 6.9895
BADULLA_LON = 81.0557

def get_weather_data(lat=BADULLA_LAT, lon=BADULLA_LON):
    url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={lat},{lon}"
    resp = requests.get(url)
    if resp.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch weather")
    
    data = resp.json().get("current", {})
    return {
        "temp_c": data.get("temp_c"),
        "humidity": data.get("humidity"),
        "precip_mm": data.get("precip_mm")
    }












# =========================
# PREDICT ENDPOINT
# =========================
@app.post("/predict")
def predict_yield(req: PredictRequest):

    weather = get_weather_data()
    lw = req.leaf_weight_kg

    if lw <= 250:
        df = pd.DataFrame([{
            "leaf_weight_kg": lw,
            "ambient_temperature_celsius": weather["temp_c"],
            "humidity_percentage": weather["humidity"],
            "rainfall_mm": weather["precip_mm"],
        }])

        y = small_model.predict(df)[0]
        powder = lw * y / 100
        model_used = "small_batch_model"
    else:
        df = pd.DataFrame([{
            "leaf_weight_kg": lw,
            "leaf_moisture_percent": 78,
            "withering_time_hours": 16,
            "fermentation_time_hours": 16,
            "drying_temperature_celsius": 90,
            "drying_duration_minutes": 45,
            "ambient_temperature_celsius": weather["temp_c"],
            "humidity_percentage": weather["humidity"],
            "rainfall_mm": weather["precip_mm"],
            "season": "Intermediate",
            "collection_region": "Upper_Division"
        }])

        powder = large_model.predict(df)[0]
        model_used = "large_batch_model"

    return {
        "predicted_powder_weight": round(powder, 2),
        "model_used": model_used
    }





# py -3.12 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

