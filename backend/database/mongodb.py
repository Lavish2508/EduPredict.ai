from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URL"))

db = client[os.getenv("DATABASE_NAME")]

users_collection = db["users"]
prediction_collection = db["predictions"]

print("✅ MongoDB Connected Successfully")