from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [
    url(r'bot/(?P<botId>\d+)/trade', consumers.TradeConsumer),
    url(r'training', consumers.TrainConsumer),
    url(r'running', consumers.RunConsumer),
]