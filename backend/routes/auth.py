from fastapi import APIRouter
from models.user import User
from database.mongodb import users_collection

router = APIRouter()

# ---------------- REGISTER ---------------- #

@router.post("/register")
def register(user: User):

    try:

        existing = users_collection.find_one({"email": str(user.email)})

        if existing:
            return {
                "success": False,
                "message": "Email already registered"
            }

        users_collection.insert_one({
            "name": user.name,
            "email": str(user.email),
            "password": user.password
        })

        return {
            "success": True,
            "message": "Registration Successful"
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }   


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(user: User):

    existing = users_collection.find_one({
        "email": user.email,
        "password": user.password
    })

    if not existing:
        return {
            "success": False,
            "message": "Invalid Email or Password"
        }

    return {
        "success": True,
        "message": "Login Successful",
        "name": existing["name"],
        "email": existing["email"]
    }