from .settings import *

# Production settings
DEBUG = False

# Production hosts
ALLOWED_HOSTS = [
    'labjournal.example.com',
    'www.labjournal.example.com',
]

# Production database (PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'labjournal'),
        'USER': os.environ.get('DB_USER', 'labuser'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'labpass123'),
        'HOST': os.environ.get('DB_HOST', 'postgres'),
        'PORT': os.environ.get('DB_PORT', '5432'),
        'OPTIONS': {
            'sslmode': 'require',
        },
    }
}

# Production CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://labjournal.example.com",
    "https://www.labjournal.example.com",
]

CORS_ALLOW_CREDENTIALS = True

# Production security settings
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Production session settings
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

# Production cache settings
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL', 'redis://redis:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Production session backend
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Production logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'json': {
            'format': '{"timestamp": "{asctime}", "level": "{levelname}", "message": "{message}", "module": "{module}", "process": "{process:d}", "thread": "{thread:d}"}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'django.log'),
            'maxBytes': 1024 * 1024 * 10,  # 10MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
        'json_file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'django_json.log'),
            'maxBytes': 1024 * 1024 * 10,  # 10MB
            'backupCount': 5,
            'formatter': 'json',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['file', 'json_file', 'console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'json_file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.security': {
            'handlers': ['file', 'json_file', 'console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['file', 'json_file', 'console'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}

# Production static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Production media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Production email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Production Celery settings
CELERY_BROKER_URL = os.environ.get('REDIS_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.environ.get('REDIS_URL', 'redis://redis:6379/0')
CELERY_TASK_ALWAYS_EAGER = False
CELERY_TASK_EAGER_PROPAGATES = True

# Production rate limiting
RATELIMIT_USE_CACHE = 'default'
RATELIMIT_ENABLE = True

# Production file upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB

# Production admin settings
ADMIN_SITE_HEADER = "Lab Journal Administration"
ADMIN_SITE_TITLE = "Lab Journal Admin Portal"
ADMIN_INDEX_TITLE = "Welcome to Lab Journal Administration"

# Production monitoring
PROMETHEUS_EXPORT_MIGRATIONS = False
PROMETHEUS_EXPORT_MIXINS = False

# Production backup settings
BACKUP_DIR = os.path.join(BASE_DIR, 'backups')
BACKUP_RETENTION_DAYS = 30

# Production security headers
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin'

# Production content security policy
CSP_DEFAULT_SRC = ("'self'",)
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
CSP_SCRIPT_SRC = ("'self'",)
CSP_IMG_SRC = ("'self'", "data:", "https:")
CSP_FONT_SRC = ("'self'", "https:", "data:")

# Production database optimization
DATABASES['default']['CONN_MAX_AGE'] = 600
DATABASES['default']['OPTIONS']['MAX_CONNS'] = 20

# Production Redis optimization
REDIS_CONNECTION_POOL_KWARGS = {
    'max_connections': 20,
    'retry_on_timeout': True,
}

# Production cache optimization
CACHE_MIDDLEWARE_SECONDS = 300
CACHE_MIDDLEWARE_KEY_PREFIX = 'labjournal'
CACHE_MIDDLEWARE_ALIAS = 'default'

# Production session optimization
SESSION_SAVE_EVERY_REQUEST = False
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

# Production middleware optimization
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
    'axes.middleware.AxesMiddleware',
    'defender.middleware.FailedLoginMiddleware',
    'django_ratelimit.middleware.RatelimitMiddleware',
]

# Production apps (remove development apps)
if 'debug_toolbar' in INSTALLED_APPS:
    INSTALLED_APPS.remove('debug_toolbar')

if 'silk' in INSTALLED_APPS:
    INSTALLED_APPS.remove('silk')

# Production template optimization
TEMPLATES[0]['OPTIONS']['debug'] = False

# Production static files optimization
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# Production media files optimization
MEDIAFILES_FINDERS = [
    'django.core.files.finders.FileSystemFinder',
    'django.core.files.finders.AppDirectoriesFinder',
]

# Production file storage
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

# Production backup configuration
BACKUP_CONFIG = {
    'database': {
        'enabled': True,
        'schedule': '0 2 * * *',  # Daily at 2 AM
        'retention_days': 30,
    },
    'media': {
        'enabled': True,
        'schedule': '0 3 * * 0',  # Weekly on Sunday at 3 AM
        'retention_days': 90,
    },
}
