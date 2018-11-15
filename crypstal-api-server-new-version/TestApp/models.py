from django.db import models


# Create your models here.
class Bot(models.Model):
    name = models.CharField(max_length=20)
    asset = models.FloatField()
    exchange = models.CharField(max_length=20)
    coin = models.CharField(max_length=20)
    period = models.CharField(max_length=20)
    strategy = models.CharField(max_length=50)
    autoTrade = models.BooleanField()
    chatBotAlarm = models.BooleanField()


class HighLowStrategy(models.Model):
    botId = models.ForeignKey(Bot, on_delete=models.CASCADE)
    HighPrice = models.FloatField()
    LowPrice = models.FloatField()


class ReinforceLearningStrategy(models.Model):
    botId = models.ForeignKey(Bot, on_delete=models.CASCADE)
    fromDate = models.DateTimeField()
    toDate = models.DateTimeField()
    coin = models.CharField(max_length=20)


class Bithumb_BTC_1m(models.Model):
    time = models.DateTimeField(primary_key=True)
    high = models.FloatField()
    low = models.FloatField()
    open = models.FloatField()
    close = models.FloatField()
    volume = models.FloatField()


class Bithumb_BTC_1h(models.Model):
    time = models.DateTimeField(primary_key=True)
    high = models.FloatField()
    low = models.FloatField()
    open = models.FloatField()
    close = models.FloatField()
    volume = models.FloatField()


class Bithumb_BTC_1d(models.Model):
    time = models.DateTimeField(primary_key=True)
    high = models.FloatField()
    low = models.FloatField()
    open = models.FloatField()
    close = models.FloatField()
    volume = models.FloatField()


class TradeHistory(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    position = models.CharField(max_length=5)
    price = models.FloatField()
    amount = models.FloatField()
    asset = models.FloatField()
    botId = models.ForeignKey(Bot, on_delete=models.CASCADE)
