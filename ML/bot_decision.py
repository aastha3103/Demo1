import pickle
import random

with open("bot_model.pkl", "rb") as f:
    model = pickle.load(f)

def roll_dice():
    return random.randint(1, 6)

def bot_turn(game_state, difficulty):
    """
    game_state = {
        'cash': int,
        'debt': int,
        'knowledge': int,
        'box_type': int
    }
    """

    dice = roll_dice()

    features = [[
        game_state["cash"],
        game_state["debt"],
        game_state["knowledge"],
        game_state["box_type"],
        difficulty
    ]]

    decision = model.predict(features)[0]

    return {
        "dice": dice,
        "decision": "RISKY" if decision == 1 else "SAFE"
    }
