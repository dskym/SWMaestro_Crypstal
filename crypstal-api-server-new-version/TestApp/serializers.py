from TestApp.models import Bot, HighLowStrategy, ReinforceLearningStrategy, TradeHistory, \
    Bithumb_BTC_1m, Bithumb_BTC_1h, Bithumb_BTC_1d
from rest_framework import serializers

import json


class HighLowStrategySerializer(serializers.ModelSerializer):
    class Meta:
        model = HighLowStrategy
        fields = ('botId', 'HighPrice', 'LowPrice')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['name'] = 'HighLowStrategy'

        return response


class ReinforceLearningStrategySerializer(serializers.ModelSerializer):
    fromDate = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    toDate = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = ReinforceLearningStrategy
        fields = ('botId', 'fromDate', 'toDate', 'coin')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['name'] = 'ReinforceLearningStrategy'

        return response


class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bot
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)

        if response['strategy'] == 'HighLowStrategy':
            query = HighLowStrategy.objects.get(botId=instance.id)
            response['strategy'] = HighLowStrategySerializer(query).data
        elif response['strategy'] == 'ReinforceLearningStrategy':
            query = ReinforceLearningStrategy.objects.get(botId=instance.id)
            response['strategy'] = ReinforceLearningStrategySerializer(query).data

        return response


class TradeHistorySerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = TradeHistory
        fields = '__all__'


class Bithumb_BTC_1m_Serializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Bithumb_BTC_1m
        fields = '__all__'


class Bithumb_BTC_1h_Serializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Bithumb_BTC_1h
        fields = '__all__'


class Bithumb_BTC_1d_Serializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Bithumb_BTC_1d
        fields = '__all__'
