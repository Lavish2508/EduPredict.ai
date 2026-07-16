from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Read Render Environment Variables
mongo_url = os.getenv("MONGODB_URL")
database_name = os.getenv("DATABASE_NAME")

if not mongo_url:
    raise Exception("MONGODB_URL is missing!")

if not database_name:
    raise Exception("DATABASE_NAME is missing!")

# Connect to MongoDB
client = MongoClient(mongo_url)

# Select Database
db = client[database_name]

# Collections
users_collection = db["users"]
prediction_collection = db["predictions"]

print("✅ MongoDB Connected Successfully")