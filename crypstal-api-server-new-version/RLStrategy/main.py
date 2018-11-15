import logging
import os
import settings
import pandas as pd
import data_manager
from policy_learner import PolicyLearner
import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('FROM', type=str, help="start?")
    parser.add_argument('TO', type=str, help="end?")
    parser.add_argument('COIN', type=str, help="coin type?")
    args = parser.parse_args()
    FROM = args.FROM
    TO = args.TO
    COIN = args.COIN

#    coin_code = '2017-10-01-min'
    model_ver = None

    log_dir = os.path.join(settings.BASE_DIR, 'logs/%s' % COIN)
    timestr = settings.get_time_str()
    if not os.path.exists('logs/%s' % COIN):
        os.makedirs('logs/%s' % COIN)
    file_handler = logging.FileHandler(filename=os.path.join(
        log_dir, "%s_%s.log" % (COIN, timestr)), encoding='utf-8')
    stream_handler = logging.StreamHandler()
    file_handler.setLevel(logging.DEBUG)
    stream_handler.setLevel(logging.INFO)
    logging.basicConfig(format="%(message)s",
                        handlers=[file_handler, stream_handler], level=logging.DEBUG)

    coin_chart = data_manager.load_chart_data(
        os.path.join(settings.BASE_DIR,'data/chart_data/{}.csv'.format(COIN)))
    print("coin chart get")
    prep_data = data_manager.preprocess(coin_chart)
    training_data = data_manager.build_training_data(prep_data)

#    start_date = '2018-05-24 00:00:00'
#    end_date = '2018-07-10 00:00:00'

    training_data = training_data[(training_data['date'] >= FROM)&(training_data['date'] < TO)]

    training_data = training_data.dropna()

    features_chart_data = ['date', 'open', 'high', 'low', 'close', 'volume']
    coin_chart = training_data[features_chart_data]

    features_training_data = [
        'open_lastclose_ratio', 'high_close_ratio', 'low_close_ratio',
        'close_lastclose_ratio', 'volume_lastvolume_ratio',
        'close_ma5_ratio', 'volume_ma5_ratio',
        'close_ma10_ratio', 'volume_ma10_ratio',
        'close_ma20_ratio', 'volume_ma20_ratio',
        'close_ma60_ratio', 'volume_ma60_ratio',
        'close_ma120_ratio', 'volume_ma120_ratio'
    ]
    training_data = training_data[features_training_data]

    print("coin_len", len(coin_chart))
    print("train_len", len(training_data))
    print(FROM, TO)


    policy_learner = PolicyLearner(
         coin_code=COIN, coin_chart=coin_chart, training_data=training_data, model_ver=model_ver,
         min_trading_unit=0.001, max_trading_unit=0.01, delayed_reward_threshold=.3, start_date=FROM, end_date=TO, lr=.09)

    print("policy learner start")

    policy_learner.fit(balance=1000000, num_epoches=10,
                       discount_factor=0, start_epsilon=.5)

    model_dir = os.path.join(settings.BASE_DIR, 'models/%s' % COIN)
    if not os.path.isdir(model_dir):
        os.makedirs(model_dir)
    model_path = os.path.join(model_dir, 'model_%s.h5' % timestr)
    policy_learner.policy_network.save_model(model_path)
    print("save")
