from flask import Blueprint, jsonify
from . import db  # Firestore client from __init__.py
from .predict_status import predict_belt_status

bp = Blueprint('bp', __name__)

@bp.route('/alerts')
def alerts():
    doc_ref = db.collection('latest_readings').document('current')
    doc = doc_ref.get()

    if doc.exists:
        data = doc.to_dict()

        # Convert strings to float safely
        try:
            temp = float(data.get("temp", 0))
            vibration = float(data.get("vibration", 0))
            rpm = int(data.get("rpm", 0))
        except Exception as e:
            return jsonify({"error": f"Invalid numeric format: {e}"}), 400

        # ML Prediction
        predicted_status = predict_belt_status(temp, vibration, rpm)
        data["predicted_alert"] = predicted_status

        return jsonify(data)

    return jsonify({
        "temp": "Unknown",
        "vibration": "Unknown",
        "rpm": "Unknown",
        "predicted_alert": "Unknown"
    })
