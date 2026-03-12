import os
import urllib.parse
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

# Add empty string fallbacks "" to prevent NoneType errors
user = os.getenv("MONGO_USER") or ""
password = os.getenv("MONGO_PASS") or ""
host = os.getenv("MONGO_HOST") or "127.0.0.1"
port = os.getenv("MONGO_PORT") or "27017"
db_name = os.getenv("MONGO_DB") or "test_db"
auth_source = os.getenv("MONGO_AUTH_SOURCE") or "admin"

safe_user = urllib.parse.quote_plus(user)
safe_password = urllib.parse.quote_plus(password)

# Only attempt to create the client if we have a user/pass (or handle the URI)
uri = f"mongodb://{safe_user}:{safe_password}@{host}:{port}/{db_name}?authSource={auth_source}"

client = AsyncIOMotorClient(uri)
db = client[db_name]
application_collection = db.get_collection("applications")