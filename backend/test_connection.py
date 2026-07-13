from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

uri = os.getenv("MONGODB_URL")

try:
    client = MongoClient(
        uri,
        tls=True,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=5000
    )

    client.admin.command("ping")

    print("✅ MongoDB Connected Successfully!")

except Exception as e:
    print("❌ Error:")
    print(e)