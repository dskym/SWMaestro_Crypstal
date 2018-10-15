import logging
import os
import settings
import data_manager
from policy_learner import PolicyLearner


if __name__ == '__main__':
    coin_code = 'bitcoin_candle2'
#    model_ver = '20181011160218'
#    model_ver = '20181012163545'
#    model_ver = '20181012165008'
#    model_ver = '20181008153652'
#    model_ver = '20181014163425'
    model_ver = '20181014165728'

    # 로그 기록
    log_dir = os.path.join(settings.BASE_DIR, 'logs/%s' % coin_code)
    timestr = settings.get_time_str()
    file_handler = logging.FileHandler(filename=os.path.join(
        log_dir, "%s_%s.log" % (coin_code, timestr)), encoding='utf-8')
    stream_handler = logging.StreamHandler()
    file_handler.setLevel(logging.DEBUG)
    stream_handler.setLevel(logging.INFO)
    logging.basicConfig(format="%(message)s",
        handlers=[file_handler, stream_handler], level=logging.DEBUG)

    # 주식 데이터 준비
    coin_chart = data_manager.load_chart_data(os.path.join(settings.BASE_DIR,'data/chart_data/{}.csv'.format(coin_code)))
    prep_data = data_manager.preprocess(coin_chart)
    training_data = data_manager.build_training_data(prep_data)

    # 기간 필터링
    training_data = training_data[(training_data['date'] >= '2018-04-01')&(training_data['date'] <= '2018-10-01')]
    training_data = training_data.dropna()

    # 차트 데이터 분리
    features_chart_data = ['date', 'open', 'high', 'low', 'close', 'volume']
    coin_chart = training_data[features_chart_data]

    # 학습 데이터 분리
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

    pv = 0
    for i in range(1000):
        # 비 학습 투자 시뮬레이션 시작
        policy_learner = PolicyLearner(
            coin_code=coin_code, coin_chart=coin_chart, training_data=training_data,
            min_trading_unit=1, max_trading_unit=3)

        policy_learner.trade(balance=10000000,
                             model_path=os.path.join(settings.BASE_DIR, 'models/{}/model_{}.h5'.format(coin_code,model_ver)), exploration=True)
        pv += policy_learner.pv()

    mean_pv = pv/1000

    print(mean_pv)