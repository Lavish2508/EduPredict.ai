import joblib
import pandas as pd

model = joblib.load("ml/student_model.pkl")


def predict_marks(attendance, study_hours, assignments, previous_marks):

    data = pd.DataFrame([{
        "attendance": attendance,
        "study_hours": study_hours,
        "assignments": assignments,
        "previous_marks": previous_marks
    }])

    prediction = model.predict(data)

    score = round(float(prediction[0]), 2)

    result = "PASS"

    if score < 40:
        result = "FAIL"

    return score, result