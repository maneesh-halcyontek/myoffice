from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Literal, Optional
from database import get_applications_collection
from bson import ObjectId
import bcrypt
from api.auth_utils import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user
)

router = APIRouter(prefix="/auth", tags=["Auth"])

collection = get_applications_collection(collection_name="users")

# ---------- Pydantic Models ----------

class UserCreate(BaseModel):
    fullName: str
    email: str
    phoneNumber: str
    gender: Literal["Male", "Female", "Other", "Prefer not to say"]
    userType: Literal["Administrator", "Manager", "Editor", "Viewer", "Support"]
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    fullName: Optional[str] = None
    email: Optional[str] = None
    phoneNumber: Optional[str] = None
    gender: Optional[Literal["Male", "Female", "Other", "Prefer not to say"]] = None
    userType: Optional[Literal["Administrator", "Manager", "Editor", "Viewer", "Support"]] = None
    password: Optional[str] = None

class RefreshRequest(BaseModel):
    refresh_token: str


# ---------- Helpers ----------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


# ---------- Routes ----------

# Create User
@router.post("/create-user", status_code=201)
async def create_user(user: UserCreate):
    
    existing = await collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = {
        "fullName": user.fullName,
        "email": user.email,
        "phoneNumber": user.phoneNumber,
        "gender": user.gender,
        "userType": user.userType,
        "password": hash_password(user.password)
    }

    result = await collection.insert_one(user_data)
    user_id = str(result.inserted_id)

    access_token = create_access_token({"sub": user_id})
    refresh_token = create_refresh_token({"sub": user_id})

    return {
        "message": "User created successfully",
        "user_id": user_id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


# Login
@router.post("/login")
async def login(credentials: UserLogin):

    user = await collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_id = str(user["_id"])
    access_token = create_access_token({"sub": user_id})
    refresh_token = create_refresh_token({"sub": user_id})

    return {
        "message": "Login successful",
        "user_id": user_id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


# Refresh Token
@router.post("/refresh")
async def refresh_token(body: RefreshRequest):
    payload = decode_token(body.refresh_token)

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    user_id = payload.get("sub")
    new_access_token = create_access_token({"sub": user_id})

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }


# Logout
@router.post("/logout")
async def logout(current_user: str = Depends(get_current_user)):
    return {"message": "Logged out successfully"}


# Get My Profile
@router.get("/me")
async def get_me(current_user: str = Depends(get_current_user)):

    user = await collection.find_one({"_id": ObjectId(current_user)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])
    user.pop("password")
    return user


# Get User by ID
@router.get("/user/{user_id}")
async def get_user(user_id: str, current_user: str = Depends(get_current_user)):

    user = await collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])
    user.pop("password")
    return user


# Get All Users
@router.get("/users")
async def get_all_users(current_user: str = Depends(get_current_user)):

    users = []
    async for user in collection.find():
        user["_id"] = str(user["_id"])
        user.pop("password")
        users.append(user)

    return users


# Update User
@router.put("/user/{user_id}")
async def update_user(
    user_id: str,
    updates: UserUpdate,
    current_user: str = Depends(get_current_user)
):
    if current_user != user_id:
        raise HTTPException(status_code=403, detail="Not allowed to update another user")

    update_data = {k: v for k, v in updates.dict().items() if v is not None}

    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])

    result = await collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User updated successfully"}


# Delete User
@router.delete("/user/{user_id}")
async def delete_user(
    user_id: str,
    current_user: str = Depends(get_current_user)
):
    if current_user != user_id:
        raise HTTPException(status_code=403, detail="Not allowed to delete another user")

    result = await collection.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}