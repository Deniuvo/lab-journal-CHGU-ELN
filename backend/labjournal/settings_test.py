from .settings import *

# Testing settings
DEBUG = False

# Test database (in-memory SQLite for speed)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

# Test CORS settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Test logging (minimal for tests)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
}

# Test static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_test'

# Test media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media_test'

# Test security (less strict for tests)
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Test cache backend
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'test-cache',
    }
}

# Test session backend
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# Test email backend
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

# Test Celery settings
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

# Test rate limiting
RATELIMIT_ENABLE = False

# Test file upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 1024 * 1024  # 1MB
DATA_UPLOARE_MAX_MEMORY_SIZE = 1024 * 1024  # 1MB

# Test middleware (minimal for tests)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]

# Test apps (minimal for tests)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    'taggit',
    'ckeditor',
    'simple_history',
    'auditlog',
    
    # Local apps
    'users',
    'experiments',
    'protocols',
    'analytics',
    'files',
]

# Test template settings
TEMPLATES[0]['OPTIONS']['debug'] = False

# Test static files finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# Test media files finders
MEDIAFILES_FINDERS = [
    'django.core.files.finders.FileSystemFinder',
    'django.core.files.finders.AppDirectoriesFinder',
]

# Test file storage
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

# Test password hashers (faster for tests)
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

# Test timezone
TIME_ZONE = 'UTC'
USE_TZ = True

# Test language
LANGUAGE_CODE = 'en-us'
USE_I18N = True
USE_L10N = True

# Test secret key
SECRET_KEY = 'test-secret-key-for-testing-only'

# Test allowed hosts
ALLOWED_HOSTS = ['testserver', 'localhost', '127.0.0.1']

# Test REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

# Test CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://testserver",
]

# Test file upload handlers
FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]

# Test session settings
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 1209600  # 2 weeks
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Test cache settings
CACHE_MIDDLEWARE_SECONDS = 300
CACHE_MIDDLEWARE_KEY_PREFIX = 'test'

# Test database settings
DATABASES['default']['TEST'] = {
    'NAME': None,
    'MIRROR': None,
    'CHARSET': None,
    'COLLATION': None,
    'MIGRATE': True,
    'MIGRATE_SILENT': True,
    'SERIALIZE': True,
}

# Test email settings
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
EMAIL_USE_TLS = False
EMAIL_USE_SSL = False

# Test file storage settings
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_DIRECTORY_PERMISSIONS = 0o755

# Test media settings
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media_test'

# Test static settings
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_test'
STATICFILES_DIRS = []

# Test security settings
SECURE_BROWSER_XSS_FILTER = False
SECURE_CONTENT_TYPE_NOSNIFF = False
X_FRAME_OPTIONS = 'SAMEORIGIN'

# Test session settings
SESSION_COOKIE_HTTPONLY = False
CSRF_COOKIE_HTTPONLY = False

# Test CORS settings
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

# Test rate limiting
RATELIMIT_USE_CACHE = 'default'
RATELIMIT_ENABLE = False

# Test file upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 1024 * 1024  # 1MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 1024 * 1024  # 1MB

# Test timezone
TIME_ZONE = 'UTC'
USE_TZ = True

# Test language
LANGUAGE_CODE = 'en-us'
USE_I18N = True
USE_L10N = True

# Test secret key
SECRET_KEY = 'test-secret-key-for-testing-only'

# Test allowed hosts
ALLOWED_HOSTS = ['testserver', 'localhost', '127.0.0.1']

# Test REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

# Test CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://testserver",
]

# Test file upload handlers
FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]

# Test session settings
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 1209600  # 2 weeks
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Test cache settings
CACHE_MIDDLEWARE_SECONDS = 300
CACHE_MIDDLEWARE_KEY_PREFIX = 'test'

# Test database settings
DATABASES['default']['TEST'] = {
    'NAME': None,
    'MIRROR': None,
    'CHARSET': None,
    'COLLATION': None,
    'MIGRATE': True,
    'MIGRATE_SILENT': True,
    'SERIALIZE': True,
}

# Test email settings
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
EMAIL_USE_TLS = False
EMAIL_USE_SSL = False

# Test file storage settings
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_DIRECTORY_PERMISSIONS = 0o755

# Test media settings
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media_test'

# Test static settings
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_test'
STATICFILES_DIRS = []

# Test security settings
SECURE_BROWSER_XSS_FILTER = False
SECURE_CONTENT_TYPE_NOSNIFF = False
X_FRAME_OPTIONS = 'SAMEORIGIN'

# Test session settings
SESSION_COOKIE_HTTPONLY = False
CSRF_COOKIE_HTTPONLY = False

# Test CORS settings
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

# Test rate limiting
RATELIMIT_USE_CACHE = 'default'
RATELIMIT_ENABLE = False
