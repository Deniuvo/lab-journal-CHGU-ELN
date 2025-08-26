"""
WSGI config for labjournal production.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys

# Add the project directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set the Django settings module for production
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'labjournal.settings_prod')

# Import Django and set up the application
from django.core.wsgi import get_wsgi_application

# Get the WSGI application
application = get_wsgi_application()

# Optional: Add middleware for production
try:
    from whitenoise import WhiteNoise
    application = WhiteNoise(application)
    application.add_files('/app/staticfiles', prefix='static/')
    application.add_files('/app/media', prefix='media/')
except ImportError:
    pass

# Optional: Add security headers middleware
try:
    from django.middleware.security import SecurityMiddleware
    from django.middleware.clickjacking import XFrameOptionsMiddleware
    from django.middleware.csrf import CsrfViewMiddleware
    
    # Add security middleware
    application = SecurityMiddleware(application)
    application = XFrameOptionsMiddleware(application)
    application = CsrfViewMiddleware(application)
except ImportError:
    pass

# Optional: Add CORS middleware
try:
    from corsheaders.middleware import CorsMiddleware
    application = CorsMiddleware(application)
except ImportError:
    pass

# Optional: Add rate limiting middleware
try:
    from django_ratelimit.middleware import RatelimitMiddleware
    application = RatelimitMiddleware(application)
except ImportError:
    pass

# Optional: Add logging middleware
try:
    import logging
    from django.utils.log import AdminEmailHandler
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(name)s %(message)s',
        handlers=[
            logging.FileHandler('/app/logs/django.log'),
            logging.StreamHandler(),
        ]
    )
    
    # Configure admin email handler
    admin_handler = AdminEmailHandler()
    admin_handler.setLevel(logging.ERROR)
    
    # Add to root logger
    logging.getLogger('').addHandler(admin_handler)
    
except ImportError:
    pass

# Optional: Add performance monitoring
try:
    from django_prometheus.metrics import MetricsMiddleware
    application = MetricsMiddleware(application)
except ImportError:
    pass

# Optional: Add Silk profiling (development only)
try:
    if os.environ.get('DJANGO_SETTINGS_MODULE') == 'labjournal.settings_dev':
        from silk.middleware import SilkyMiddleware
        application = SilkyMiddleware(application)
except ImportError:
    pass

# Optional: Add debug toolbar (development only)
try:
    if os.environ.get('DJANGO_SETTINGS_MODULE') == 'labjournal.settings_dev':
        from debug_toolbar.middleware import DebugToolbarMiddleware
        application = DebugToolbarMiddleware(application)
except ImportError:
    pass

# Optional: Add health check endpoint
def health_check(environ, start_response):
    """Simple health check endpoint for load balancers."""
    if environ.get('PATH_INFO') == '/health/':
        status = '200 OK'
        response_headers = [('Content-Type', 'text/plain')]
        start_response(status, response_headers)
        return [b'OK']
    return None

# Wrap the application with health check
original_application = application

def application_with_health_check(environ, start_response):
    health_response = health_check(environ, start_response)
    if health_response is not None:
        return health_response
    return original_application(environ, start_response)

application = application_with_health_check
