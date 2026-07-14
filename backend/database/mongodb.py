from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_url = os.getenv("MONGODB_URL")

if not mongo_url:
    raise Exception("MONGODB_URL is missing!")

client = MongoClient(mongo_url)

db = client[os.getenv("DATABASE_NAME")]

users_collection = db["users"]
prediction_collection = db["predictions"]

print("✅ MongoDB Connected Successfully")