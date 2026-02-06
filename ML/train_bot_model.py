import pickle
import random
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# -----------------------------
# Generate training data
# -----------------------------

X = []  # features
y = []  # decisions (0 = safe, 1 = risky)

for _ in range(5000):
    cash = random.randint(0, 20000)
    debt = random.randint(0, 15000)
    knowledge = random.randint(0, 100)
    box_type = random.randint(0, 3)  # 0=normal,1=risk,2=opportunity,3=emergency
    difficulty = random.randint(0, 2)  # 0=easy,1=medium,2=hard

    # Simple logic to generate labels
    risk_score = (
        (cash < 3000) * 2 +
        (debt > 5000) * 2 +
        (knowledge < 40) +
        box_type
    )

    if difficulty == 0:      # easy bot
        decision = 0
    elif difficulty == 1:    # medium bot
        decision = 1 if risk_score < 4 else 0
    else:                    # hard bot
        decision = 1 if risk_score < 6 else 0

    X.append([cash, debt, knowledge, box_type, difficulty])
    y.append(decision)

X = np.array(X)
y = np.array(y)

# -----------------------------
# Train model
# -----------------------------

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=6,
    random_state=42
)

model.fit(X, y)

# -----------------------------
# Save model
# -----------------------------

with open("bot_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Bot model trained & saved as bot_model.pkl")
