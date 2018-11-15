import logging
import os
import settings
import data_manager
from policy_learner import PolicyLearner
import argparse


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('MODEL', type=int, help="trained model name?")
    parser.add_argument('COIN', type=str, help="coin type?")
    parser.add_argument('BALANCE', type=int, help="initial balance?")

    args = parser.parse_args()
    MODEL = args.MODEL
    COIN = args.COIN
    BALANCE = args.BALANCE

#    coin_code = '2017-10-01-min'
#    model_ver = '20181104164658'

    log_dir = os.path.join(settings.BASE_DIR, 'logs/%s' % COIN)
    timestr = settings.get_time_str()
    file_handler = logging.FileHandler(filename=os.path.join(
        log_dir, "%s_%s.log" % (COIN, timestr)), encoding='utf-8')
    stream_handler = logging.StreamHandler()
    file_handler.setLevel(logging.DEBUG)
    stream_handler.setLevel(logging.INFO)
    logging.basicConfig(format="%(message)s",
        handlers=[file_handler, stream_handler], level=logging.DEBUG)

    coin_chart = data_manager.load_chart_data(os.path.join(settings.BASE_DIR,'data/chart_data/{}.csv'.format(coin_code)))
    prep_data = data_manager.preprocess_min(coin_chart)
    training_data = data_manager.build_training_data(prep_data)

    start_date = '2018-10-13 00:00:00'
    end_date = '2018-10-14 00:00:00'
    training_data = training_data[(training_data['date'] >= start_date)&(training_data['date'] < end_date)]
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
        'close_ma120_ratio', 'volume_ma120_ratio']

    training_data = training_data[features_training_data]

    policy_learner = PolicyLearner(
        coin_code=COIN, coin_chart=coin_chart, training_data=training_data,
        min_trading_unit=0.001, max_trading_unit=0.01,start_date=start_date, end_date=end_date)

    policy_learner.trade(balance=BALANCE,
                         model_path=os.path.join(settings.BASE_DIR, 'models/{}/model_{}.h5'.format(COIN,MODEL)))
