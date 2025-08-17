from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import lightgbm as lgb
import numpy as np
from pydantic import BaseModel
from datetime import datetime, timedelta

# Load model
model = lgb.Booster(model_file=r"C:\Users\saeem\Desktop\Energy Consumption\app\energy_usage_model.txt")

# ✅ Reuse the exact categories from training
STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Delhi"]   # put all training states here
REGIONS = ["WR", "SR", "NR", "ER"]                                        # put all training regions here

# FastAPI app
app = FastAPI(title="Energy Usage Predictor", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class PredictionRequest(BaseModel):
    state: str
    region: str
    days: int

@app.post("/predict")
def predict_usage(req: PredictionRequest):
    predictions = []
    today = datetime.today()

    for i in range(req.days):
        future_date = today + timedelta(days=i)

        # Feature engineering
        features = {
            "States": req.state,
            "Regions": req.region,
            "latitude": 0.0,
            "longitude": 0.0,
            "year": future_date.year,
            "month": future_date.month,
            "day": future_date.day,
            "dayofweek": future_date.weekday(),
            "is_weekend": int(future_date.weekday() >= 5),
        }

        df = pd.DataFrame([features])

        # Ensure same categories
        df["States"] = pd.Categorical(df["States"], categories=STATES)
        df["Regions"] = pd.Categorical(df["Regions"], categories=REGIONS)

        # Predict
        pred = model.predict(df)[0]

        predictions.append({
            "date": future_date.strftime("%Y-%m-%d"),
            "predicted_usage": round(float(pred), 2)
        })

    return {"predictions": predictions}

