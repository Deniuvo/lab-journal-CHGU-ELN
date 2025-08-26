from .settings import *

# Development settings
DEBUG = True

# Allow all hosts in development
ALLOWED_HOSTS = ['*']

# Development database (SQLite for simplicity)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Development CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

CORS_ALLOW_ALL_ORIGINS = True

# Development logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'django_dev.log',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

# Development static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Development media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Development security (less strict for development)
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Development email backend
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Development cache backend
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}

# Development session backend
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# Development debug toolbar
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INTERNAL_IPS = ['127.0.0.1', 'localhost']

# Development Silk profiler
if DEBUG:
    INSTALLED_APPS += ['silk']
    MIDDLEWARE += ['silk.middleware.SilkyMiddleware']
    SILKY_PYTHON_PROFILER = True
    SILKY_PYTHON_PROFILER_MEMORY = True

# Development CORS headers
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Development file upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 50 * 1024 * 1024  # 50MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 50 * 1024 * 1024  # 50MB

# Development timezone
TIME_ZONE = 'UTC'
USE_TZ = True

# Development language
LANGUAGE_CODE = 'en-us'
USE_I18N = True
USE_L10N = True

# Development static files finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# Development template loaders
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

# Development middleware (add development-specific middleware)
if DEBUG:
    MIDDLEWARE += [
        'django.middleware.common.CommonMiddleware',
    ]

# Development apps (add development-specific apps)
if DEBUG:
    INSTALLED_APPS += [
        'django_extensions',
    ]

# Development shell plus
SHELL_PLUS_PRE_IMPORTS = [
    ('django.db.models', ('Q', 'F')),
    ('datetime', ('datetime', 'timedelta', 'date')),
    ('decimal', ('Decimal',)),
]

# Development IPython
SHELL_PLUS = 'ipython'
