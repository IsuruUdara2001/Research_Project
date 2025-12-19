from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from firebase_config import db

router = APIRouter()

class WeightData(BaseModel):
    weight_value: float

@router.post("/api/iot/weight")
def save_weight(data: WeightData):
    try:
        db.collection("iot_weight_data").add({
            "weight_value": data.weight_value,
            "timestamp": datetime.utcnow()
        })
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





@router.get("/api/iot/weight/latest")
def get_latest_weight():
    docs = (
        db.collection("iot_weight_data")
        .order_by("timestamp", direction="DESCENDING")
        .limit(1)
        .stream()
    )

    for doc in docs:
        data = doc.to_dict()
        return {
            "weight_value": data.get("weight_value", 0),
            "timestamp": data.get("timestamp")
        }

    return {
        "weight_value": 0,
        "message": "No weight data found"
    }