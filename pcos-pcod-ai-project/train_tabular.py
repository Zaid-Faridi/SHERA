import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

def strip_columns(df):
    df.columns = df.columns.str.strip()
    return df

print("Loading dataset...")
data_path = os.path.join("Dataset", "clinical_data.csv")
df = pd.read_csv(data_path)
df = strip_columns(df)

# Drop useless columns
drop_cols = ["Sl. No", "Patient File No.", "PCOS (Y/N)", "Unnamed: 44"]
# check if unnamed exists
drop_cols = [col for col in drop_cols if col in df.columns]

X = df.drop(columns=drop_cols)
y = df["PCOS (Y/N)"]

# Handle missing values - simple imputation with median
X = X.apply(pd.to_numeric, errors='coerce')
X = X.fillna(X.median())

print(f"Features shape: {X.shape}")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Random Forest...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

preds = model.predict(X_test)
acc = accuracy_score(y_test, preds)
print(f"Accuracy: {acc*100:.2f}%")

# Save the model
model_path = os.path.join("models", "tabular_model.pkl")
os.makedirs("models", exist_ok=True)
joblib.dump(model, model_path)

# Save feature names for the backend
joblib.dump(list(X.columns), os.path.join("models", "tabular_features.pkl"))

print(f"Model saved to {model_path}")
