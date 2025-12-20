from typing import Dict
from random import choice, randint

QUALITY_LABELS = ["Premium", "High", "Medium", "Low"]


def run_dummy_model(image_path: str) -> Dict:
    """
    Replace with your real ML model.

    Currently:
    - Picks a random quality label
    - Returns random confidence + some fake feature values
    """
    label = choice(QUALITY_LABELS)
    confidence = randint(80, 98)

    features = {
        "color_L": round(randint(45, 70) + 0.3, 1),
        "color_a": round(randint(0, 8) + 0.2, 1),
        "color_b": round(randint(5, 20) + 0.4, 1),
        "texture_contrast": 0.21,
        "texture_homogeneity": 0.89,
        "shape_area": 12340,
        "shape_aspect_ratio": 2.1,
    }

    return {
        "grade": label,
        "confidence": confidence,
        "features": features,
    }
