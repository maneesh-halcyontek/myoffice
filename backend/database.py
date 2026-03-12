import os
import urllib.parse
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load the variables from .env
load_dotenv()

# Fetch raw values
user = os.getenv("MONGO_USER")
password = os.getenv("MONGO_PASS")
host = os.getenv("MONGO_HOST")
port = os.getenv("MONGO_PORT")
db_name = os.getenv("MONGO_DB")
auth_source = os.getenv("MONGO_AUTH_SOURCE")

# URL encode the credentials (especially for that '@' symbol)
safe_user = urllib.parse.quote_plus(user)
safe_password = urllib.parse.quote_plus(password)

# Construct URI
uri = f"mongodb://{safe_user}:{safe_password}@{host}:{port}/{db_name}?authSource={auth_source}"

client = AsyncIOMotorClient(uri)
db = client[db_name]
application_collection = db.get_collection("applications")