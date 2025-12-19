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
