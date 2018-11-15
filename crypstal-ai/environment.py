import time
import datetime
import pandas as pd
import numpy as np
import get_data_manager
import urllib.request


class Environment:

    PRICE_IDX = 4

    def __init__(self, coin_chart=None):
        self.coin_chart = coin_chart
        self.observation = None
        self.idx = -1
        self.date = None
        self.date1 = None
        self.result = None
        self.training_data = None
        self.final = None

        self.db = pd.DataFrame()
        self.db['date'] = [0] * 120
        self.db['open'] = [0] * 120
        self.db['high'] = [0] * 120
        self.db['low'] = [0] * 120
        self.db['close'] = [0] * 120
        self.db['volume'] = [0] * 120
        self.features_training_data = [
        'open_lastclose_ratio', 'high_close_ratio', 'low_close_ratio',
        'close_lastclose_ratio', 'volume_lastvolume_ratio',
        'close_ma5_ratio', 'volume_ma5_ratio',
        'close_ma10_ratio', 'volume_ma10_ratio',
        'close_ma20_ratio', 'volume_ma20_ratio',
        'close_ma60_ratio', 'volume_ma60_ratio',
        'close_ma120_ratio', 'volume_ma120_ratio'
    ]

    def reset(self):
        self.observation = None
        self.idx = -1

    def observe(self):
        if len(self.coin_chart) > self.idx + 1:
            self.idx += 1
            self.observation = self.coin_chart.iloc[self.idx]
            return self.observation
        return None

    def get_price(self):
        if np.isnan(self.observation.close):
            return None
        if (self.observation is not None):
            return self.observation[self.PRICE_IDX]
        return None

    def set_chart_data(self, coin_chart):
        self.coin_chart = coin_chart


    def observe_simul(self):

        self.date = datetime.datetime.now()
        self.date = self.date - datetime.timedelta(minutes=1)
        self.date1 = self.date.strftime("%Y-%m-%d %H:%M:00")
        a = urllib.request.urlopen(
            "http://35.189.155.121:8000/candle?from={}%20{}&to={}%20{}&coin=BTC&period=1m&exchange=Bithumb".format(
                self.date1.split(' ')[0], self.date1.split(' ')[1], self.date1.split(' ')[0],
                self.date1.split(' ')[1]))
        self.result = get_data_manager.preprocess_urlib(str(a.read()))
        self.db = self.db.drop(self.db.index[0], 0)
        self.db = self.db.append(pd.Series(self.result, index=['date', 'close', 'volume', 'open', 'high', 'low']), ignore_index=True)
        self.final = get_data_manager.preprocess(self.db)
        self.training_data = get_data_manager.build_training_data(self.final)
        self.training_data = self.training_data[self.features_training_data]
        self.training_data = self.training_data.fillna(0)

        return self.training_data.iloc[-1], self.result[1], self.date
