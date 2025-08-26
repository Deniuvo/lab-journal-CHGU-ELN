.PHONY: help install build start stop restart logs clean test lint format migrate superuser shell

# Default target
help:
	@echo "Lab Journal - Available commands:"
	@echo ""
	@echo "Installation:"
	@echo "  install     Install all dependencies"
	@echo "  build       Build Docker images"
	@echo ""
	@echo "Development:"
	@echo "  start       Start the application"
	@echo "  stop        Stop the application"
	@echo "  restart     Restart the application"
	@echo "  logs        View application logs"
	@echo ""
	@echo "Database:"
	@echo "  migrate     Run database migrations"
	@echo "  superuser   Create Django superuser"
	@echo "  shell       Open Django shell"
	@echo ""
	@echo "Code Quality:"
	@echo "  test        Run tests"
	@echo "  lint        Run linting"
	@echo "  format      Format code"
	@echo ""
	@echo "Maintenance:"
	@echo "  clean       Clean up Docker resources"
	@echo "  backup      Create database backup"

# Installation
install:
	@echo "Installing dependencies..."
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

build:
	@echo "Building Docker images..."
	docker-compose build --no-cache

# Development
start:
	@echo "Starting Lab Journal..."
	docker-compose up -d
	@echo "Application is starting up..."
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:8000"
	@echo "Admin:    http://localhost:8000/admin"

stop:
	@echo "Stopping Lab Journal..."
	docker-compose down

restart:
	@echo "Restarting Lab Journal..."
	docker-compose restart

logs:
	@echo "Viewing logs..."
	docker-compose logs -f

# Database
migrate:
	@echo "Running database migrations..."
	docker-compose exec backend python manage.py makemigrations
	docker-compose exec backend python manage.py migrate

superuser:
	@echo "Creating Django superuser..."
	docker-compose exec backend python manage.py createsuperuser

shell:
	@echo "Opening Django shell..."
	docker-compose exec backend python manage.py shell

# Code Quality
test:
	@echo "Running tests..."
	cd backend && python -m pytest
	cd frontend && npm test

lint:
	@echo "Running linting..."
	cd backend && flake8 .
	cd backend && black --check .
	cd backend && isort --check-only .
	cd frontend && npm run lint

format:
	@echo "Formatting code..."
	cd backend && black .
	cd backend && isort .
	cd frontend && npm run format

# Maintenance
clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

backup:
	@echo "Creating database backup..."
	@mkdir -p backups
	docker-compose exec postgres pg_dump -U labuser labjournal > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "Backup created in backups/ directory"

# Development shortcuts
dev-backend:
	@echo "Starting backend in development mode..."
	cd backend && python manage.py runserver

dev-frontend:
	@echo "Starting frontend in development mode..."
	cd frontend && npm start

# Production
prod-build:
	@echo "Building for production..."
	cd frontend && npm run build
	docker-compose -f docker-compose.prod.yml build

prod-start:
	@echo "Starting production environment..."
	docker-compose -f docker-compose.prod.yml up -d

# SSL
ssl-generate:
	@echo "Generating SSL certificates..."
	mkdir -p docker/nginx/ssl
	cd docker/nginx/ssl && \
	openssl genrsa -out labjournal.key 2048 && \
	openssl req -new -x509 -key labjournal.key -out labjournal.crt -days 365 \
		-subj "/C=US/ST=State/L=City/O=LabJournal/CN=labjournal.example.com"
	@echo "SSL certificates generated in docker/nginx/ssl/"

# Monitoring
status:
	@echo "Application status:"
	docker-compose ps
	@echo ""
	@echo "Resource usage:"
	docker stats --no-stream

# Quick start for new developers
quickstart: install build start migrate
	@echo ""
	@echo "🎉 Lab Journal is ready!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:8000"
	@echo "Admin:    http://localhost:8000/admin"
	@echo ""
	@echo "Next steps:"
	@echo "1. Create a superuser: make superuser"
	@echo "2. Open the application in your browser"
	@echo "3. Start exploring!"
