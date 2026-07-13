import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Sample Dataset
data = {
    "attendance": [60,70,80,90,95,85,75,65,88,92],
    "study_hours": [2,3,4,6,8,5,4,3,7,9],
    "assignments": [50,60,70,90,95,80,75,65,85,98],
    "previous_marks": [45,55,60,80,90,70,68,50,82,91],
    "final_marks": [48,58,68,84,94,76,72,55,86,96]
}

df = pd.DataFrame(data)

X = df[["attendance","study_hours","assignments","previous_marks"]]
y = df["final_marks"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "ml/student_model.pkl")

print("✅ AI Model Trained Successfully!")