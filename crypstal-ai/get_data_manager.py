import pandas as pd
import numpy as np
import datetime
import time
import urllib.request

def preprocess(chart_data):
    prep_data = chart_data
    windows = [5, 10, 20, 60, 120]
    for window in windows:
        prep_data['close_ma{}'.format(window)] = prep_data['close'].rolling(window).sum() / len(prep_data['close'] != 0)
        prep_data['volume_ma{}'.format(window)] = (
            prep_data['volume'].rolling(window).sum() / len(prep_data['volume'] != 0) )
    return prep_data

def preprocess_urlib(k):
    if len(k)<= 5:
        return [0,0,0,0,0,0]
    kk = k.split(',')
    date = kk[0][12:31]
    high = float(kk[1].split(':')[1])
    low = float(kk[2].split(':')[1])
    open = float(kk[3].split(':')[1])
    close = float(kk[4].split(':')[1])
    volume = float(kk[5].split(':')[1][:-3])
    return [date, close, volume, open, high, low]

def get_data(date):
    a = urllib.request.urlopen(
        "http://35.189.155.121:8000/candle?from={}%20{}&to={}%20{}&coin=BTC&period=1m&exchange=Bithumb".format(
            date.split(' ')[0], date.split(' ')[1],date.split(' ')[0],date.split(' ')[1]))
    print(a.read())
    return preprocess(str(a.read()))


def build_training_data(prep_data):
    training_data = prep_data
    training_data['open_lastclose_ratio'] = np.zeros(len(training_data))
    training_data.loc[1:, 'open_lastclose_ratio'] = \
        (training_data['open'][1:]- training_data['close'][:-1]) / \
        training_data['close'][:-1]
    training_data['high_close_ratio'] = \
        (training_data['high'] - training_data['close']) / \
        training_data['close']
    training_data['low_close_ratio'] = \
        (training_data['low'] - training_data['close']) / \
        training_data['close']
    training_data['close_lastclose_ratio'] = np.zeros(len(training_data))
    training_data.loc[1:, 'close_lastclose_ratio'] = \
        (training_data['close'][1:] - training_data['close'][:-1]) / \
        training_data['close'][:-1]
    training_data['volume_lastvolume_ratio'] = np.zeros(len(training_data))
    training_data.loc[1:, 'volume_lastvolume_ratio'] = \
        (training_data['volume'][1:] - training_data['volume'][:-1]) / \
        training_data['volume'][:-1]\
            .replace(to_replace=0, method='ffill') \
            .replace(to_replace=0, method='bfill')

    windows = [5, 10, 20, 60, 120]
    for window in windows:
        training_data['close_ma%d_ratio' % window] = \
            (training_data['close'] - training_data['close_ma%d' % window]) / \
            training_data['close_ma%d' % window]
        training_data['volume_ma%d_ratio' % window] = \
            (training_data['volume'] - training_data['volume_ma%d' % window]) / \
            training_data['volume_ma%d' % window]

    return training_data
