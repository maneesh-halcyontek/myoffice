import os
import urllib.parse
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

def get_database():
    user = os.getenv("MONGO_USER") or "admin" # Fallback for tests
    password = os.getenv("MONGO_PASS") or "password"
    host = os.getenv("MONGO_HOST") or "127.0.0.1"
    port = os.getenv("MONGO_PORT") or "27017"
    db_name = os.getenv("MONGO_DB") or "myoffice"
    auth_source = os.getenv("MONGO_AUTH_SOURCE") or "admin"

    safe_user = urllib.parse.quote_plus(user)
    safe_password = urllib.parse.quote_plus(password)

    uri = f"mongodb://{safe_user}:{safe_password}@{host}:{port}/{db_name}?authSource={auth_source}"
    
    client = AsyncIOMotorClient(uri)
    return client[db_name]

# This is now a function call inside your routes
def get_applications_collection(collection_name="applications"):
    db = get_database()
    return db.get_collection(collection_name)