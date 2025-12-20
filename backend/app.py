import os
import uuid
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from firebase_config import get_scans_collection
from prediction import run_dummy_model

# Load .env if present
load_dotenv()

# ---------- Flask app ----------
app = Flask(__name__)
CORS(app)  # allow all origins in dev; restrict in prod

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ---------- Helpers ----------

def serialize_scan(doc) -> dict:
    data = doc.to_dict()
    data["id"] = doc.id
    created = data.get("created_at")
    if created is not None and hasattr(created, "isoformat"):
        data["created_at"] = created.isoformat()
    return data


# ---------- Simple homepage ----------

@app.route("/", methods=["GET"])
def home():
    # Just to check backend is alive
    return jsonify(
        {
            "status": "OK",
            "message": "Tea Quality Grader Backend is Running!",
            "endpoints": {
                "health": "/health",
                "scan": "/api/scan",
                "history": "/api/history",
                "batch_assign": "/api/batches/assign",
                "analytics_summary": "/api/analytics/summary",
            },
        }
    ), 200


# ---------- API Routes ----------

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/scan", methods=["POST"])
def create_scan():
    """
    1. Receive tea leaf image
    2. Run dummy prediction
    3. Store in Firestore
    4. Return prediction
    """
    if "image" not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    image = request.files["image"]
    user_id = request.form.get("user_id", "demo-user")
    device_id = request.form.get("device_id", "unknown-device")

    # Save image locally (you can later upload to Firebase Storage)
    ext = os.path.splitext(image.filename)[1] or ".jpg"
    img_name = f"{uuid.uuid4().hex}{ext}"
    img_path = os.path.join(UPLOAD_DIR, img_name)
    image.save(img_path)

    # Run dummy model
    prediction = run_dummy_model(img_path)

    # Store in Firestore
    scans_col = get_scans_collection()
    doc_data = {
        "user_id": user_id,
        "device_id": device_id,
        "image_path": img_name,
        "grade": prediction["grade"],
        "confidence": prediction["confidence"],
        "features": prediction["features"],
        "batch": None,  # later set by Batch Assignment
        "created_at": datetime.utcnow(),
    }
    doc_ref = scans_col.document()
    doc_ref.set(doc_data)

    doc_data["id"] = doc_ref.id
    doc_data["created_at"] = doc_data["created_at"].isoformat()

    return jsonify({"message": "Prediction completed", "scan": doc_data}), 201


@app.route("/api/history", methods=["GET"])
def get_history():
    """
    Get recent scans for History page.
    Accepts optional:
      - user_id (query param)
      - limit (query param)
    """
    user_id = request.args.get("user_id", "demo-user")
    limit = int(request.args.get("limit", 20))

    scans_col = get_scans_collection()
    # Firestore query: filter by user, order by created_at desc, limit
    # Note: direction arg may need firestore.Query.DESCENDING
    query = (
        scans_col.where("user_id", "==", user_id)
        .order_by("created_at", direction="DESCENDING")
        .limit(limit)
    )
    docs = query.stream()
    items = [serialize_scan(d) for d in docs]

    return jsonify({"items": items}), 200


@app.route("/api/batches/assign", methods=["PATCH", "POST"])
def assign_batch():
    """
    Assign one scan to a batch. Body (JSON):
    {
      "scan_id": "<document id>",
      "batch_label": "Premium Batch"  // e.g. "Premium", "High", "Low"
    }
    """
    data = request.get_json() or {}
    scan_id = data.get("scan_id")
    batch_label = data.get("batch_label")

    if not scan_id or not batch_label:
        return jsonify({"error": "scan_id and batch_label are required"}), 400

    scans_col = get_scans_collection()
    doc_ref = scans_col.document(scan_id)
    doc = doc_ref.get()
    if not doc.exists:
        return jsonify({"error": "Scan not found"}), 404

    doc_ref.update({"batch": batch_label})

    return jsonify({"message": "Batch updated", "scan_id": scan_id}), 200


@app.route("/api/analytics/summary", methods=["GET"])
def analytics_summary():
    """
    Simple distribution stats for Analytics page.
    Optional query param: user_id
    """
    user_id = request.args.get("user_id")
    scans_col = get_scans_collection()

    if user_id:
        query = scans_col.where("user_id", "==", user_id)
    else:
        query = scans_col

    docs = query.stream()

    counts = {"Premium": 0, "High": 0, "Medium": 0, "Low": 0}
    total = 0
    for d in docs:
        data = d.to_dict()
        grade = data.get("grade")
        if grade in counts:
            counts[grade] += 1
        total += 1

    return jsonify({"total": total, "distribution": counts}), 200


if __name__ == "__main__":
    # Run dev server
    app.run(host="0.0.0.0", port=8000, debug=True)
