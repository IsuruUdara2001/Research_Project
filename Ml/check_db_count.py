import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(r"D:\BeltMonitoring\Backend\serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Count documents in history
docs = db.collection("history").stream()
count = sum(1 for _ in docs)

print(f"🔥 Total documents in 'history': {count}")
