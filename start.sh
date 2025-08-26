#!/bin/bash

# Lab Journal - Startup Script
echo "🚀 Starting Lab Journal Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p docker/nginx/ssl
mkdir -p backend/logs
mkdir -p backend/media

# Generate self-signed SSL certificates if they don't exist
if [ ! -f "docker/nginx/ssl/labjournal.crt" ] || [ ! -f "docker/nginx/ssl/labjournal.key" ]; then
    echo "🔐 Generating self-signed SSL certificates..."
    cd docker/nginx/ssl
    
    # Generate private key
    openssl genrsa -out labjournal.key 2048
    
    # Generate certificate
    openssl req -new -x509 -key labjournal.key -out labjournal.crt -days 365 \
        -subj "/C=US/ST=State/L=City/O=LabJournal/CN=labjournal.example.com"
    
    cd ../..
    echo "✅ SSL certificates generated successfully"
fi

# Set proper permissions for SSL files
echo "🔒 Setting SSL file permissions..."
chmod 600 docker/nginx/ssl/*.key
chmod 644 docker/nginx/ssl/*.crt

# Build and start services
echo "🏗️  Building and starting services..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Initialize database
echo "🗄️  Initializing database..."
docker-compose exec -T backend python manage.py migrate --noinput
docker-compose exec -T backend python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "👤 Creating superuser (if not exists)..."
docker-compose exec -T backend python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@labjournal.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
EOF

echo ""
echo "🎉 Lab Journal is now running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "🌐 Admin Panel: http://localhost:8000/admin"
echo "📊 Service Status: docker-compose ps"
echo "📝 Logs: docker-compose logs -f"
echo ""
echo "🔑 Default admin credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "⚠️  Remember to change default passwords in production!"
echo ""
echo "To stop the application, run: docker-compose down"
