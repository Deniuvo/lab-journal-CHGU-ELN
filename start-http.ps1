# Lab Journal - Startup Script for Windows (HTTP Only)
Write-Host "🚀 Starting Lab Journal Application (HTTP Mode)..." -ForegroundColor Green

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
New-Item -ItemType Directory -Force -Path "backend\logs" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\media" | Out-Null

# Build and start services (without nginx/SSL)
Write-Host "🏗️  Building and starting services (HTTP mode)..." -ForegroundColor Yellow
docker-compose -f docker-compose.yml up -d --build postgres redis backend frontend

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
Write-Host "🎉 Lab Journal is now running in HTTP mode!" -ForegroundColor Green
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
Write-Host "⚠️  This is HTTP mode - no SSL encryption!" -ForegroundColor Red
Write-Host "⚠️  Remember to change default passwords in production!" -ForegroundColor Red
Write-Host ""
Write-Host "To stop the application, run: docker-compose down" -ForegroundColor Cyan

