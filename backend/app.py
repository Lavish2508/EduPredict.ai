from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.prediction import router as prediction_router
from routes.student import router as student_router

app = FastAPI(
    title="EduPredict AI",
    version="1.0.0"
)

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://edupredict-ai-cfl6.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(prediction_router, prefix="/prediction", tags=["Prediction"])
app.include_router(student_router, prefix="/student", tags=["Student"])

@app.get("/")
def home():
    return {
        "message": "EduPredict AI Backend Running 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }