import os
import shutil
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_applications_collection
app = FastAPI()
# Allow CORS for all origins (you can restrict this in production)
# This tells FastAPI to allow requests from your React dev server
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # Create React App default
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],               # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],               # Allows all headers
)   

# Directory to save uploaded resumes
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

#home route
@app.get("/")
async def home():
    return {"message": "Welcome to Home Page"}


# Resume and application routes
@app.post("/apply")
async def apply_for_job(
    fullName: str = Form(...),
    email: str = Form(...),
    position: str = Form(...),
    coverLetter: str = Form(None),
    resume: UploadFile = File(...)
):
    # 1. Validate file type (optional but recommended)
    if not resume.filename.endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF/DOCX allowed.")

    # 2. Construct the file path
    # Pro-tip: Adding the email or timestamp to the filename prevents overwriting
    file_path = os.path.join(UPLOAD_DIR, "resumes", f"{email}_{resume.filename}")
    
    try:
        # 3. Save the file to uploads/resumes
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
            
        # 4. Prepare data for MongoDB
        application_data = {
            "fullName": fullName,
            "email": email,
            "position": position,
            "coverLetter": coverLetter,
            "resumePath": file_path,
            "status": "pending"
        }

        # 5. Insert into MongoDB 'myoffice' database
        result = await application_collection.insert_one(application_data)
        
        return {
            "message": "Application submitted successfully",
            "application_id": str(result.inserted_id)
        }

    except Exception as e:
        # Clean up file if DB insertion fails
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")