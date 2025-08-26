# Electronic Laboratory Journal

Современное веб-приложение для управления лабораторными экспериментами и протоколами в стиле iOS.

## Особенности

- **Ролевая система** с 7 уровнями доступа (от Администратора до Ассистента)
- **iOS-стиль дизайн** с использованием SF Pro Text и бело-серой цветовой схемы
- **Полнофункциональный API** на Django REST Framework
- **Современный фронтенд** на React + TypeScript
- **Безопасность** с HTTPS, двухфакторной аутентификацией и логированием
- **Docker-развертывание** с Nginx и PostgreSQL

## Технологический стек

### Backend
- **Python 3.11** + **Django 4.2**
- **PostgreSQL** для основной БД
- **Redis** для кэширования и сессий
- **Celery** для фоновых задач
- **Django REST Framework** для API

### Frontend
- **React 18** + **TypeScript**
- **Material-UI** с кастомной темой iOS
- **Framer Motion** для анимаций
- **React Query** для управления состоянием

### Infrastructure
- **Docker** + **Docker Compose**
- **Nginx** как reverse proxy
- **Let's Encrypt** для SSL сертификатов

## Роли пользователей

| Роль | Права доступа |
|------|---------------|
| **Администратор** | Полный доступ, управление пользователями |
| **Модератор** | Контроль содержимого, редактирование записей |
| **Ментор** | Просмотр и комментирование экспериментов |
| **Руководитель** | Доступ к статистике и отчетам |
| **Старший ученый** | Создание/редактирование протоколов |
| **Младший ученый** | Ввод данных в разрешенные разделы |
| **Ассистент** | Просмотр без редактирования |

## Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Домен (например, labjournal.example.com)
- SSL сертификат (Let's Encrypt)

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd lab-journal
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# Database
DB_NAME=labjournal
DB_USER=labuser
DB_PASSWORD=labpass123
DB_HOST=postgres
DB_PORT=5432

# Django
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=labjournal.example.com,localhost

# Redis
REDIS_URL=redis://redis:6379

# Domain
DOMAIN=labjournal.example.com
```

### 3. Настройка SSL сертификатов

Создайте самоподписанные сертификаты для разработки:

```bash
mkdir -p docker/nginx/ssl
cd docker/nginx/ssl

# Генерация приватного ключа
openssl genrsa -out labjournal.key 2048

# Генерация сертификата
openssl req -new -x509 -key labjournal.key -out labjournal.crt -days 365 \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=labjournal.example.com"
```

Для продакшена используйте Let's Encrypt:

```bash
# Установка certbot
sudo apt install certbot

# Получение сертификата
sudo certbot certonly --standalone -d labjournal.example.com

# Копирование сертификатов
sudo cp /etc/letsencrypt/live/labjournal.example.com/fullchain.pem docker/nginx/ssl/labjournal.crt
sudo cp /etc/letsencrypt/live/labjournal.example.com/privkey.pem docker/nginx/ssl/labjournal.key
```

### 4. Запуск приложения

```bash
# Сборка и запуск всех сервисов
docker-compose up -d --build

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f
```

### 5. Инициализация базы данных

```bash
# Создание миграций
docker-compose exec backend python manage.py makemigrations

# Применение миграций
docker-compose exec backend python manage.py migrate

# Создание суперпользователя
docker-compose exec backend python manage.py createsuperuser

# Сбор статических файлов
docker-compose exec backend python manage.py collectstatic --noinput
```

### 6. Доступ к приложению

- **Frontend**: https://labjournal.example.com
- **Backend API**: https://labjournal.example.com/api/
- **Admin Panel**: https://labjournal.example.com/admin/

## Конфигурация

### Nginx

Основная конфигурация находится в `docker/nginx/nginx.conf` и `docker/nginx/sites-enabled/labjournal.conf`.

### Django

Настройки Django в `backend/labjournal/settings.py` включают:
- Безопасность (HTTPS, HSTS, XSS защита)
- База данных PostgreSQL
- Redis для кэширования
- Логирование всех действий
- CORS настройки

### Frontend

Конфигурация React в `frontend/src/App.tsx` включает:
- iOS-стиль тема
- Роутинг
- Контекст аутентификации
- Анимации

## Мониторинг и логи

### Логи приложения

```bash
# Django логи
docker-compose exec backend tail -f logs/django.log

# Nginx логи
docker-compose logs -f nginx

# PostgreSQL логи
docker-compose logs -f postgres
```

### Метрики

Приложение включает встроенный мониторинг:
- Django Prometheus метрики
- Django Silk для профилирования
- Django Debug Toolbar (в режиме разработки)

## Безопасность

### Аутентификация и авторизация

- **Session-based аутентификация** с Django
- **Ролевая система** с детальными разрешениями
- **Двухфакторная аутентификация** для администраторов
- **Логирование всех действий** пользователей

### Защита от атак

- **Rate limiting** для API endpoints
- **CSRF защита**
- **XSS защита**
- **SQL injection защита**
- **Clickjacking защита**

### Сетевая безопасность

- **HTTPS только** с современными шифрами
- **HSTS заголовки**
- **Безопасные заголовки** в Nginx
- **Ограничение доступа** по IP (опционально)

## Развертывание в продакшене

### 1. Обновление переменных окружения

```bash
DEBUG=False
SECRET_KEY=<strong-secret-key>
ALLOWED_HOSTS=labjournal.example.com
```

### 2. Настройка SSL с Let's Encrypt

```bash
# Автоматическое обновление сертификатов
sudo crontab -e

# Добавить строку:
0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Настройка бэкапов

```bash
# Создание скрипта бэкапа
mkdir -p scripts
cat > scripts/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec postgres pg_dump -U labuser labjournal > backup_${DATE}.sql
tar -czf backup_${DATE}.tar.gz backup_${DATE}.sql
rm backup_${DATE}.sql
EOF

chmod +x scripts/backup.sh
```

### 4. Мониторинг и алерты

```bash
# Установка мониторинга
docker-compose -f docker-compose.monitoring.yml up -d
```

## Разработка

### Локальная разработка

```bash
# Запуск только базы данных
docker-compose up -d postgres redis

# Запуск Django в режиме разработки
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

# Запуск React в режиме разработки
cd frontend
npm install
npm start
```

### Структура проекта

```
lab-journal/
├── backend/                 # Django backend
│   ├── labjournal/         # Основной проект
│   ├── users/              # Приложение пользователей
│   ├── experiments/        # Приложение экспериментов
│   ├── protocols/          # Приложение протоколов
│   ├── analytics/          # Приложение аналитики
│   └── files/              # Приложение файлов
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/          # Страницы приложения
│   │   ├── contexts/       # React контексты
│   │   └── services/       # API сервисы
├── docker/                 # Docker конфигурация
│   └── nginx/              # Nginx конфигурация
└── docs/                   # Документация
```

## API Документация

### Аутентификация

```bash
# Вход в систему
POST /api/auth/login/
{
  "username": "user",
  "password": "password"
}

# Выход из системы
POST /api/auth/logout/
```

### Пользователи

```bash
# Получение профиля
GET /api/users/profile/

# Обновление профиля
PATCH /api/users/profile/
{
  "first_name": "John",
  "last_name": "Doe"
}
```

### Эксперименты

```bash
# Список экспериментов
GET /api/experiments/

# Создание эксперимента
POST /api/experiments/
{
  "title": "New Experiment",
  "description": "Description",
  "objective": "Objective"
}
```

## Устранение неполадок

### Частые проблемы

1. **Ошибка подключения к базе данных**
   ```bash
   docker-compose logs postgres
   docker-compose restart postgres
   ```

2. **Проблемы с SSL сертификатами**
   ```bash
   # Проверка сертификата
   openssl x509 -in docker/nginx/ssl/labjournal.crt -text -noout
   
   # Перезапуск Nginx
   docker-compose restart nginx
   ```

3. **Проблемы с правами доступа**
   ```bash
   # Проверка прав на файлы
   ls -la docker/nginx/ssl/
   
   # Исправление прав
   chmod 600 docker/nginx/ssl/*.key
   chmod 644 docker/nginx/ssl/*.crt
   ```

### Логи и отладка

```bash
# Включение отладки Django
DEBUG=True

# Просмотр всех логов
docker-compose logs -f

# Проверка статуса сервисов
docker-compose ps
docker-compose top
```

## Поддержка

Для получения поддержки:
1. Проверьте раздел "Устранение неполадок"
2. Просмотрите логи приложения
3. Создайте issue в репозитории

## Лицензия
Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.
---
