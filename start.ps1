# Lab Journal - Startup Script for Windows
Write-Host "🚀 Starting Lab Journal Application..." -ForegroundColor Green

# Fix SSL/TLS issues in PowerShell
Write-Host "🔧 Fixing SSL/TLS configuration..." -ForegroundColor Yellow
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12, [Net.SecurityProtocolType]::Tls13
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is available
try {
    docker-compose --version | Out-Null
} catch {
    Write-Host "❌ Docker Compose is not available. Please install Docker Compose first." -ForegroundColor Red
    exit 1
}

# Create necessary directories
Write-Host "📁 Creating necessary directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "docker\nginx\ssl" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\logs" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\media" | Out-Null

# Generate self-signed SSL certificates if they don't exist
if (-not (Test-Path "docker\nginx\ssl\labjournal.crt") -or -not (Test-Path "docker\nginx\ssl\labjournal.key")) {
    Write-Host "🔐 Generating self-signed SSL certificates..." -ForegroundColor Yellow
    
    # Check if OpenSSL is available
    try {
        openssl version | Out-Null
    } catch {
        Write-Host "❌ OpenSSL is not available. Please install OpenSSL or use existing certificates." -ForegroundColor Red
        Write-Host "You can download OpenSSL from: https://slproweb.com/products/Win32OpenSSL.html" -ForegroundColor Yellow
        exit 1
    }
    
    # Generate private key
    openssl genrsa -out "docker\nginx\ssl\labjournal.key" 2048
    
    # Generate certificate
    openssl req -new -x509 -key "docker\nginx\ssl\labjournal.key" -out "docker\nginx\ssl\labjournal.crt" -days 365 -subj "/C=US/ST=State/L=City/O=LabJournal/CN=labjournal.example.com"
    
    Write-Host "✅ SSL certificates generated successfully" -ForegroundColor Green
}

# Build and start services
Write-Host "🏗️  Building and starting services..." -ForegroundColor Yellow
docker-compose up -d --build

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Check service status
Write-Host "📊 Checking service status..." -ForegroundColor Yellow
docker-compose ps

# Initialize database
Write-Host "🗄️  Initializing database..." -ForegroundColor Yellow
docker-compose exec -T backend python manage.py migrate --noinput
docker-compose exec -T backend python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
Write-Host "👤 Creating superuser (if not exists)..." -ForegroundColor Yellow
docker-compose exec -T backend python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@labjournal.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"

Write-Host ""
Write-Host "🎉 Lab Journal is now running!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "🌐 Admin Panel: http://localhost:8000/admin" -ForegroundColor Cyan
Write-Host "📊 Service Status: docker-compose ps" -ForegroundColor Cyan
Write-Host "📝 Logs: docker-compose logs -f" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Default admin credentials:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Remember to change default passwords in production!" -ForegroundColor Red
Write-Host ""
Write-Host "To stop the application, run: docker-compose down" -ForegroundColor Cyan
