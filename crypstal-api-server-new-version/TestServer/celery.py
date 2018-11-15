from __future__ import absolute_import
import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TestServer.settings')

app = Celery('TestServer')
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

CELERYBEAT_SCHEDULE = {
    'save_bithumb_btc_every-minutes': {
        'task': 'TestApp.tasks.save_bithumb_btc_1m',
        'schedule': crontab(minute='*/1'),
        'args': ()
    },
}

app.conf.update(
    BROKER_URL='redis://localhost:6379/0',
    CELERY_RESULT_BACKEND='redis://localhost:6379/0',
    CELERY_TIMEZONE='Asia/Seoul',
    CELERY_ENABLE_UTC=False,
    CELERY_RESULT_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['application/json'],
    CELERY_TASK_SERIALIZER='json',
    CELERYBEAT_SCHEDULE=CELERYBEAT_SCHEDULE
)

