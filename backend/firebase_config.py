import os
from functools import lru_cache

import firebase_admin
from firebase_admin import credentials, firestore


@lru_cache
def init_firebase():
    """
    Initialize Firebase app and return Firestore client.
    Only runs once thanks to lru_cache.
    """
    cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "./firebase-key.json")

    if not firebase_admin._apps:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)

    return firestore.client()


def get_scans_collection():
    """
    Reference to 'scans' collection where we store every prediction.
    """
    db = init_firebase()
    return db.collection("scans")
