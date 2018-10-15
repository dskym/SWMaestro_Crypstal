import pandas as pd
import numpy as np


def load_chart_data(fpath):
    chart_data = pd.read_csv(fpath)
    chart_data.pop("Unnamed: 0")
    chart_data.columns = ['date', 'open', 'high', 'low', 'close', 'volume']
    chart_data['date'] = [str(i) for i in chart_data.date.values]
    return chart_data


def preprocess(chart_data): # 일봉
    prep_data = chart_data
    windows = [5, 10, 20, 60, 120]
    for window in windows:
        prep_data['close_ma{}'.format(window)] = prep_data['close'].rolling(window).mean()
        prep_data['volume_ma{}'.format(window)] = (
            prep_data['volume'].rolling(window).mean())
    return prep_data


def preprocess_hour(chart_data): # 시간봉
    prep_data = chart_data
    windows = [24*5, 24*10, 24*20, 24*60, 24*120]
    for window in windows:
        prep_data['close_ma{}'.format(window)] = prep_data['close'].rolling(window).mean()
        prep_data['volume_ma{}'.format(window)] = (
            prep_data['volume'].rolling(window).mean())
    return prep_data


def macd(chart_data): # 일봉
    prep_data = chart_data
    prep_data['26_ewma'] = pd.ewma(prep_data.close, span=26)
    prep_data['12_ewma'] = pd.ewma(prep_data.close, span=12)
    prep_data['MACD'] = (prep_data['12_ewma'] - prep_data['26_ewma'])
    prep_data['signal'] = pd.ewma(prep_data.MACD, span=9)
    return prep_data


def build_training_data(prep_data):
    training_data = prep_data
    # 전일 종가 대비 당일 시가
    training_data['open_lastclose_ratio'] = np.zeros(len(training_data))
    training_data.loc[1:, 'open_lastclose_ratio'] = \
        (training_data['open'][1:].values - training_data['close'][:-1].values) / \
        training_data['close'][:-1].values
    # 당일 종가 대비 당일 고가
    training_data['high_close_ratio'] = \
        (training_data['high'].values - training_data['close'].values) / \
        training_data['close'].values
    # 당일 종가 대비 당일 저가 비율
    training_data['low_close_ratio'] = \
        (training_data['low'].values - training_data['close'].values) / \
        training_data['close'].values
    # 당일 종가 대비 전일 종가 비율
    training_data['close_lastclose_ratio'] = np.zeros(len(training_data))
    training_data.loc[1:, 'close_lastclose_ratio'] = \
        (training_data['close'][1:].values - training_data['close'][:-1].values) / \
        training_data['close'][:-1].values
    # 전일 거래량 대비 당일 거래량
    training_data['volume_lastvolume_ratio'] = np.zeros(len(training_data))
    training_data.loc[1:, 'volume_lastvolume_ratio'] = \
        (training_data['volume'][1:].values - training_data['volume'][:-1].values) / \
        training_data['volume'][:-1]\
            .replace(to_replace=0, method='ffill') \
            .replace(to_replace=0, method='bfill').values

    # window 평균 종가 대비 당일 종가
    # window 평균 거래량 대비 당일 거래량
    windows = [5, 10, 20, 60, 120]
    for window in windows:
        training_data['close_ma%d_ratio' % window] = \
            (training_data['close'] - training_data['close_ma%d' % window]) / \
            training_data['close_ma%d' % window]
        training_data['volume_ma%d_ratio' % window] = \
            (training_data['volume'] - training_data['volume_ma%d' % window]) / \
            training_data['volume_ma%d' % window]

    return training_data


# chart_data = pd.read_csv(fpath, encoding='CP949', thousands=',', engine='python')
