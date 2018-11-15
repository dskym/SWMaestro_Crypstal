from django.utils import timezone

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db import transaction

from TestApp.models import TradeHistory, Bot, HighLowStrategy, ReinforceLearningStrategy, \
    Bithumb_BTC_1m, Bithumb_BTC_1h, Bithumb_BTC_1d

from TestApp.serializers import TradeHistorySerializer, BotSerializer, HighLowStrategySerializer, \
    ReinforceLearningStrategySerializer, Bithumb_BTC_1m_Serializer, Bithumb_BTC_1d_Serializer, Bithumb_BTC_1h_Serializer

from django_celery_beat.models import PeriodicTask, IntervalSchedule


class BotView(APIView):
    def get(self, request, botId=None):
        if botId is None:
            bots = Bot.objects.all()
            serializer = BotSerializer(bots, many=True)

            return Response(serializer.data)
        else:
            bot = Bot.objects.get(id=botId)
            serializer = BotSerializer(bot)

            return Response(serializer.data)

    @transaction.atomic
    def post(self, request):
        data = {
            'name': request.data['name'],
            'exchange': request.data['exchange'],
            'asset': request.data['asset'],
            'coin': request.data['coin'],
            'period': request.data['period'],
            'strategy': request.data['strategy']['name'],
            'autoTrade': request.data['autoTrade'],
            'chatBotAlarm': request.data['chatBotAlarm'],
        }

        botSerializer = BotSerializer(data=data)

        if botSerializer.is_valid():
            bot = botSerializer.save()

            if request.data['strategy']['name'] == 'HighLowStrategy':
                strategyData = {
                    'botId': bot.id,
                    'HighPrice': request.data['strategy']['HighPrice'],
                    'LowPrice': request.data['strategy']['LowPrice'],
                }

                highLowStrategySerializer = HighLowStrategySerializer(data=strategyData)

                if highLowStrategySerializer.is_valid():
                    highLowStrategySerializer.save()

            elif request.data['strategy']['name'] == 'ReinforceLearningStrategy':
                strategyData = {
                    'botId': bot.id,
                    'fromDate': request.data['strategy']['fromDate'],
                    'toDate': request.data['strategy']['toDate'],
                    'coin': request.data['strategy']['coin'],
                }

                reinforceLearningStrategySerializer = ReinforceLearningStrategySerializer(data=strategyData)

                if reinforceLearningStrategySerializer.is_valid():
                    reinforceLearningStrategySerializer.save()

            return Response(botSerializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    # 봇 전략 다른 것으로 수정할 경우 고민
    @transaction.atomic
    def put(self, request, botId=None):
        if botId is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            data = {
                'name': request.data['name'],
                'exchange': request.data['exchange'],
                'asset': request.data['asset'],
                'coin': request.data['coin'],
                'period': request.data['period'],
                'strategy': request.data['strategy']['name'],
                'autoTrade': request.data['autoTrade'],
                'chatBotAlarm': request.data['chatBotAlarm'],
            }

            bot = Bot.objects.get(pk=botId)
            botSerializer = BotSerializer(bot, data=data)

            if botSerializer.is_valid():
                botSerializer.save()

                if request.data['strategy']['name'] == 'HighLowStrategy':
                    strategyData = {
                        'botId': bot.id,
                        'HighPrice': request.data['strategy']['HighPrice'],
                        'LowPrice': request.data['strategy']['LowPrice'],
                    }

                    highLowStrategy = HighLowStrategy.objects.get(botId=bot.id)
                    highLowStrategySerializer = HighLowStrategySerializer(highLowStrategy, data=strategyData)

                    if highLowStrategySerializer.is_valid():
                        highLowStrategySerializer.save()

                elif request.data['strategy']['name'] == 'ReinforceLearningStrategy':
                    strategyData = {
                        'botId': bot.id,
                        'fromDate': request.data['strategy']['fromDate'],
                        'toDate': request.data['strategy']['toDate'],
                        'coin': request.data['strategy']['coin'],
                    }

                    reinforceLearningStrategy = ReinforceLearningStrategy.objects.get(botId=bot.id)
                    reinforceLearningStrategySerializer = ReinforceLearningStrategySerializer(reinforceLearningStrategy,
                                                                                              data=strategyData)

                    if reinforceLearningStrategySerializer.is_valid():
                        reinforceLearningStrategySerializer.save()

                return Response(botSerializer.data)

    def delete(self, request, botId=None):
        if botId is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            bot = Bot.objects.get(pk=botId)
            bot.delete()

            return Response(status=status.HTTP_200_OK)


class TradingHistoryView(APIView):
    def get(self, request):
        queryset = TradeHistory.objects.all()
        serializer = TradeHistorySerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request):
        data = {
            'time': timezone.localtime(),
            'position': request.data['position'],
            'price': request.data['price'],
            'amount': request.data['amount'],
            'asset': request.data['asset'],
        }

        serializer = TradeHistorySerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            queryset = TradeHistory.objects.all()
            serializer = TradeHistorySerializer(queryset, many=True)

            return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class BacktestView(APIView):
    def get(self, request):
        return Response(request.query_params)


class TradeView(APIView):
    def get(self, request, botId=None):
        queryset = TradeHistory.objects.filter(botId=botId)
        serializer = TradeHistorySerializer(queryset, many=True)

        return Response(serializer.data)


class CandleView(APIView):
    def get(self, request):
        data = request.query_params

        exchange = data['exchange'].capitalize()
        coin = data['coin'].upper()
        period = data['period'].lower()

        # from to
        if 'from' in data and 'to' in data:
            fromDate = data['from']
            toDate = data['to']

            if exchange == 'Bithumb':
                if coin == 'BTC':
                    if period == '1m':
                        queryset = Bithumb_BTC_1m.objects.filter(time__range=(fromDate, toDate))
                        serializer = Bithumb_BTC_1m_Serializer(queryset, many=True)
                    elif period == '1h':
                        queryset = Bithumb_BTC_1h.objects.filter(time__range=(fromDate, toDate))
                        serializer = Bithumb_BTC_1h_Serializer(queryset, many=True)
                    elif period == '1d':
                        queryset = Bithumb_BTC_1d.objects.filter(time__range=(fromDate, toDate))
                        serializer = Bithumb_BTC_1d_Serializer(queryset, many=True)
        # count
        elif 'count' in data:
            count = int(data['count'])

            if exchange == 'Bithumb':
                if coin == 'BTC':
                    if period == '1m':
                        queryset = Bithumb_BTC_1m.objects.order_by('-time')[:count]
                        serializer = Bithumb_BTC_1m_Serializer(queryset, many=True)
                    elif period == '1h':
                        queryset = Bithumb_BTC_1h.objects.order_by('-time')[:count]
                        serializer = Bithumb_BTC_1h_Serializer(queryset, many=True)
                    elif period == '1d':
                        queryset = Bithumb_BTC_1d.objects.order_by('-time')[:count]
                        serializer = Bithumb_BTC_1d_Serializer(queryset, many=True)
        # default
        else:
            if exchange == 'Bithumb':
                if coin == 'BTC':
                    if period == '1m':
                        queryset = Bithumb_BTC_1m.objects.order_by('-time')[:200]
                        serializer = Bithumb_BTC_1m_Serializer(queryset, many=True)
                    elif period == '1h':
                        queryset = Bithumb_BTC_1h.objects.order_by('-time')[:200]
                        serializer = Bithumb_BTC_1h_Serializer(queryset, many=True)
                    elif period == '1d':
                        queryset = Bithumb_BTC_1d.objects.order_by('-time')[:200]
                        serializer = Bithumb_BTC_1d_Serializer(queryset, many=True)

        return Response(serializer.data)
