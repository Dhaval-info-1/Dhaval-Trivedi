# Start-BlogServer.ps1

# Create and activate virtual environment
Write-Host "Setting up Python virtual environment..." -ForegroundColor Green
python -m venv venv
./venv/Scripts/Activate.ps1

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
pip install -r requirements.txt

# Start the server
Write-Host "Starting the blog server..." -ForegroundColor Green
Write-Host "Access the blog at http://localhost:8000/blog" -ForegroundColor Cyan
python server.py
