import pickle
import m2cgen as m2c

# Load the trained model
with open("bot_model.pkl", "rb") as f:
    model = pickle.load(f)

# Convert to JavaScript
js_code = m2c.export_to_javascript(model)

# Save to a file that can be used in React Native
# We add a wrapper to return the class with highest probability
with open("bot_model.js", "w") as f:
    f.write("export function predict(input) {\n")
    f.write(js_code)
    f.write("\n  const probs = score(input);\n")
    f.write("  return probs[0] > probs[1] ? 0 : 1;\n")
    f.write("}")

print("✅ Model converted to JavaScript: bot_model.js (Returns class 0 or 1)")
