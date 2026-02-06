from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import os
import random

app = FastAPI()

# Load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "ML", "bot_model.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

class GameState(BaseModel):
    cash: int
    debt: int
    knowledge: int
    box_type: int
    difficulty: int # 0: Easy, 1: Medium, 2: Hard

@app.get("/")
def read_root():
    return {"status": "Econopolis ML Backend Running"}

@app.post("/bot-decision")
def get_bot_decision(state: GameState):
    if model is None:
        raise HTTPException(status_code=500, detail="ML Model not loaded")
    
    features = [[
        state.cash,
        state.debt,
        state.knowledge,
        state.box_type,
        state.difficulty
    ]]
    
    try:
        prediction = model.predict(features)[0]
        dice1 = random.randint(1, 6)
        dice2 = random.randint(1, 6)
        
        return {
            "dice": [dice1, dice2],
            "total": dice1 + dice2,
            "decision": "RISKY" if prediction == 1 else "SAFE"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
