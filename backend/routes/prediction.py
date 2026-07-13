from ml.predict import predict_marks
from fastapi import APIRouter
from pydantic import BaseModel
from database.mongodb import prediction_collection

router = APIRouter()

class Subject(BaseModel):
    subject: str
    marks: float

class StudentData(BaseModel):
    name: str
    attendance: float
    study_hours: float
    assignments: float
    subjects: list[Subject]

@router.post("/predict")
def predict(data: StudentData):

    average_marks = sum(subject.marks for subject in data.subjects) / len(data.subjects)

    predicted_score, result_status = predict_marks(
        data.attendance,
        data.study_hours,
        data.assignments,
        average_marks
    )

    if predicted_score > 100:
        predicted_score = 100

    if predicted_score < 0:
        predicted_score = 0

    result_status = "PASS" if predicted_score >= 40 else "FAIL"

    # Grade
    if predicted_score >= 90:
        grade = "A+"
    elif predicted_score >= 80:
        grade = "A"
    elif predicted_score >= 70:
        grade = "B"
    elif predicted_score >= 60:
        grade = "C"
    elif predicted_score >= 50:
        grade = "D"
    else:
        grade = "F"

    # Performance
    if predicted_score >= 85:
        performance = "Excellent"
    elif predicted_score >= 70:
        performance = "Good"
    elif predicted_score >= 55:
        performance = "Average"
    else:
        performance = "Poor"

    # Risk
    if predicted_score >= 75:
        risk = "Low"
    elif predicted_score >= 50:
        risk = "Medium"
    else:
        risk = "High"

    strengths = []
    weaknesses = []
    recommendations = []

    if data.attendance >= 85:
        strengths.append("Excellent Attendance")
    else:
        weaknesses.append("Low Attendance")
        recommendations.append("Maintain attendance above 85%")

    if data.study_hours >= 3:
        strengths.append("Good Study Habits")
    else:
        weaknesses.append("Low Study Hours")
        recommendations.append("Study at least 3-4 hours daily")

    if data.assignments >= 70:
        strengths.append("Assignments Submitted Properly")
    else:
        weaknesses.append("Poor Assignment Performance")
        recommendations.append("Improve assignment quality")

    if average_marks >= 70:
        strengths.append("Strong Subject Performance")
    else:
        weaknesses.append("Weak Subject Performance")
        recommendations.append("Focus on low-scoring subjects")

    if not recommendations:
        recommendations.append("Keep up the excellent work!")

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    study_plan = {}

    for i, subject in enumerate(data.subjects):
        if i < len(days):
            study_plan[days[i]] = subject.subject

    study_plan["Saturday"] = "Revision"
    study_plan["Sunday"] = "Mock Test"

    prediction = {
        "name": data.name,
        "attendance": data.attendance,
        "study_hours": data.study_hours,
        "assignments": data.assignments,
        "subjects": [
            {
                "subject": s.subject,
                "marks": s.marks
            }
            for s in data.subjects
        ],
        "average_subject_marks": round(average_marks, 2),
        "predicted_score": round(predicted_score, 2),
        "result": result_status,
        "grade": grade,
        "performance": performance,
        "risk": risk,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations,
        "study_plan": study_plan
    }

    inserted = prediction_collection.insert_one(prediction)

    prediction["_id"] = str(inserted.inserted_id)

    return prediction

@router.get("/history")
def history():

    records = []

    for item in prediction_collection.find():

        item["_id"] = str(item["_id"])

        records.append(item)

    return records


@router.get("/dashboard")
def dashboard():

    records = list(prediction_collection.find())

    total_students = len(records)

    pass_count = 0
    fail_count = 0

    total_score = 0
    total_attendance = 0

    highest_score = 0
    topper = "N/A"

    high_risk = 0

    for item in records:

        score = item.get("predicted_score", 0)

        attendance = item.get("attendance", 0)

        total_score += score

        total_attendance += attendance

        if item.get("result") == "PASS":
            pass_count += 1
        else:
            fail_count += 1

        if score > highest_score:
            highest_score = score
            topper = item.get("name", "N/A")

        if item.get("risk") == "High":
            high_risk += 1

    average_score = round(total_score / total_students, 2) if total_students else 0

    average_attendance = round(total_attendance / total_students, 2) if total_students else 0

    return {

        "total_students": total_students,

        "pass_count": pass_count,

        "fail_count": fail_count,

        "average_score": average_score,

        "average_attendance": average_attendance,

        "highest_score": highest_score,

        "topper": topper,

        "high_risk": high_risk

    }