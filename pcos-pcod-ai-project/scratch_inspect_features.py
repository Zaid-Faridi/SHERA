import joblib
import os

model_dir = "models"
tabular_features_path = os.path.join(model_dir, "tabular_features.pkl")

if os.path.exists(tabular_features_path):
    features = joblib.load(tabular_features_path)
    print("Features:", features)
else:
    print("Features file not found")
