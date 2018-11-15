import logging
import os
import settings
import data_manager
from policy_learner import PolicyLearner
import argparse
import get_data_manager
import urllib.request
import time
import datetime
import pandas as pd
import numpy as np

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('MODEL', type=int, help="trained model name?")
    parser.add_argument('COIN', type=str, help="coin type?")
    parser.add_argument('BALANCE', type=int, help="initial balance?")

    args = parser.parse_args()
    MODEL = args.MODEL
    COIN = args.COIN
    BALANCE = args.BALANCE

    log_dir = os.path.join(settings.BASE_DIR, 'logs/%s' % COIN)
    timestr = settings.get_time_str()
    file_handler = logging.FileHandler(filename=os.path.join(
        log_dir, "%s_%s.log" % (COIN, timestr)), encoding='utf-8')
    stream_handler = logging.StreamHandler()
    file_handler.setLevel(logging.DEBUG)
    stream_handler.setLevel(logging.INFO)
    logging.basicConfig(format="%(message)s",
        handlers=[file_handler, stream_handler], level=logging.DEBUG)

    policy_learner = PolicyLearner(
                coin_code=COIN, coin_chart=None, training_data=None,
                min_trading_unit=1, max_trading_unit=3)

    policy_learner.trade(balance=BALANCE,
                         model_path=os.path.join(settings.BASE_DIR, 'models/{}/model_{}.h5'.format(COIN,MODEL)))
