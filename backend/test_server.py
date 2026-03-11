from fastapi.testclient import TestClient
from server import app  # Import your FastAPI app instance

# Initialize the TestClient with your app
client = TestClient(app)

def test_read_home():
    """
    Test that the root endpoint returns a 200 status code 
    and the correct welcome message.
    """
    # Act: Send a GET request to "/"
    response = client.get("/")
    
    # Assert: Check the status code
    assert response.status_code == 200
    
    # Assert: Check the JSON body
    assert response.json() == {"message": "Welcome to Home Page"}

def test_cors_headers():
    """
    Test that CORS headers are present (since you added CORSMiddleware).
    """
    # Act: Send an OPTIONS request (pre-flight)
    response = client.options(
        "/",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        }
    )
    
    # Assert: Check that the origin is allowed
    assert response.headers.get("access-control-allow-origin") == "*"