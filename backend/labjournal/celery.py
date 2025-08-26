import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'labjournal.settings')

app = Celery('labjournal')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

# Celery configuration
app.conf.update(
    # Task routing
    task_routes={
        'experiments.tasks.*': {'queue': 'experiments'},
        'protocols.tasks.*': {'queue': 'protocols'},
        'analytics.tasks.*': {'queue': 'analytics'},
        'files.tasks.*': {'queue': 'files'},
    },
    
    # Task serialization
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    
    # Task execution
    task_always_eager=False,
    task_eager_propagates=True,
    task_ignore_result=False,
    task_store_errors_even_if_ignored=True,
    
    # Worker configuration
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
    worker_disable_rate_limits=False,
    
    # Result backend
    result_expires=3600,  # 1 hour
    result_backend_transport_options={
        'master_name': 'mymaster',
    },
    
    # Beat schedule
    beat_schedule={
        'cleanup-old-files': {
            'task': 'files.tasks.cleanup_old_files',
            'schedule': 3600.0,  # Every hour
        },
        'generate-analytics-reports': {
            'task': 'analytics.tasks.generate_daily_reports',
            'schedule': 86400.0,  # Daily
        },
        'backup-database': {
            'task': 'analytics.tasks.backup_database',
            'schedule': 604800.0,  # Weekly
        },
        'cleanup-expired-sessions': {
            'task': 'users.tasks.cleanup_expired_sessions',
            'schedule': 3600.0,  # Every hour
        },
    },
    
    # Task time limits
    task_soft_time_limit=300,  # 5 minutes
    task_time_limit=600,        # 10 minutes
    
    # Worker time limits
    worker_max_memory_per_child=200000,  # 200MB
    
    # Logging
    worker_log_format='[%(asctime)s: %(levelname)s/%(processName)s] %(message)s',
    worker_task_log_format='[%(asctime)s: %(levelname)s/%(processName)s] [%(task_name)s(%(task_id)s)] %(message)s',
    
    # Security
    security_key='your-security-key-here',
    security_certificate='path/to/cert.pem',
    security_cert_store='path/to/certs/',
    
    # Monitoring
    worker_send_task_events=True,
    task_send_sent_event=True,
    event_queue_expires=60,
    event_queue_ttl=5.0,
    
    # Error handling
    task_annotations={
        'tasks.add': {'rate_limit': '10/s'},
        'experiments.tasks.process_experiment_data': {'rate_limit': '5/m'},
        'files.tasks.process_file_upload': {'rate_limit': '20/m'},
    },
    
    # Task retry
    task_acks_late=True,
    task_reject_on_worker_lost=True,
    task_remote_tracebacks=True,
    
    # Result backend
    result_persistent=True,
    result_expires=3600,
    result_backend_transport_options={
        'retry_policy': {
            'timeout': 5.0
        }
    },
)

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
