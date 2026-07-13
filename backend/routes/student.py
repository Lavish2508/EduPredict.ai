from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def student_home():
    return {
        "message": "Student API Running"
    }