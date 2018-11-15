from __future__ import absolute_import
from TestServer.celery import app
from ExchangeAPI import BithumbAPI
from datetime import datetime, timedelta
import pymysql.cursors
from pytz import timezone


@app.task
def save_bithumb_btc_1m():
    conn = pymysql.connect(host='35.201.207.75',
                           user='root',
                           password='crypstal-pw',
                           db='crypstal')

    # 이전 봉 그리기
    pastTime = datetime.now(timezone('Asia/Seoul')) - timedelta(minutes=1)

    # 1분 틱이 100개 넘어갈 거 고려하기
    history = BithumbAPI.get_transaction_history(count=100)

    # 해당 시간 틱 데이터가 없는 경우 고려하기
    temp_data = None

    beforeData = None

    try:
        while True:
            flag = False

            history['data'].sort(key=lambda v: v['transaction_date'], reverse=True)

            validPastTime = False

            for index, data in enumerate(history['data']):
                pastTimeStr = pastTime.strftime('%Y-%m-%d %H:%M')
                transactionTimeStr = datetime.strptime(data['transaction_date'], '%Y-%m-%d %H:%M:%S').strftime(
                    '%Y-%m-%d %H:%M')

                # 이전 시간 데이터가 있을 때
                if transactionTimeStr == pastTimeStr:
                    validPastTime = True
                    # 초기 설정
                    if temp_data is None:
                        temp_data = {
                            'time': transactionTimeStr,
                            'open': float(data['price']),
                            'high': float(data['price']),
                            'low': float(data['price']),
                            'close': float(data['price']),
                            'volume': float(data['units_traded']),
                        }
                    # 이후 설정
                    else:
                        if float(data['price']) > temp_data['high']:
                            temp_data['high'] = float(data['price'])

                        if float(data['price']) < temp_data['low']:
                            temp_data['low'] = float(data['price'])

                        temp_data['volume'] += float(data['units_traded'])
                # 시간이 달라졌을 때
                elif validPastTime is True:
                    temp_data['open'] = float(beforeData['price'])
                    temp_data['volume'] += float(data['units_traded'])

                    flag = True

                    with conn.cursor() as cursor:
                        sql = 'INSERT INTO TestApp_bithumb_btc_1m (time, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s)'

                        cursor.execute(sql, (
                            temp_data['time'], temp_data['high'], temp_data['low'], temp_data['open'],
                            temp_data['close'], temp_data['volume']))

                        conn.commit()

                    break
                # 이전 시간 데이터가 없을 때
                elif datetime.strptime(transactionTimeStr, '%Y-%m-%d %H:%M') < datetime.strptime(pastTimeStr,
                                                                                                 '%Y-%m-%d %H:%M'):
                    break
                else:
                    continue

                beforeData = data

            if flag is True:
                break

            cont_no = beforeData['cont_no']

            history = BithumbAPI.get_transaction_history(count=100, cont_no=cont_no)
    finally:
        conn.close()

    return temp_data


"""
@app.task
def save_bithumb_btc_1h():
    conn = pymysql.connect(host='35.201.207.75',
                           user='root',
                           password='crypstal-pw',
                           db='crypstal')

    # 이전 봉 그리기
    pastTime = datetime.now(timezone('Asia/Seoul')) - timedelta(minutes=1)

    # 1분 틱이 100개 넘어갈 거 고려하기
    history = BithumbAPI.get_transaction_history(count=100)

    # 해당 시간 틱 데이터가 없는 경우 고려하기
    temp_data = None

    beforeData = None

    try:
        while True:
            flag = False

            history['data'].sort(key=lambda v: v['transaction_date'], reverse=True)

            validPastTime = False

            for index, data in enumerate(history['data']):
                pastTimeStr = pastTime.strftime('%Y-%m-%d %H:%M')
                transactionTimeStr = datetime.strptime(data['transaction_date'], '%Y-%m-%d %H:%M:%S').strftime(
                    '%Y-%m-%d %H:%M')

                # 이전 시간 데이터가 있을 때
                if transactionTimeStr == pastTimeStr:
                    validPastTime = True
                    # 초기 설정
                    if temp_data is None:
                        temp_data = {
                            'time': transactionTimeStr,
                            'open': float(data['price']),
                            'high': float(data['price']),
                            'low': float(data['price']),
                            'close': float(data['price']),
                            'volume': float(data['units_traded']),
                        }
                    # 이후 설정
                    else:
                        if float(data['price']) > temp_data['high']:
                            temp_data['high'] = float(data['price'])

                        if float(data['price']) < temp_data['low']:
                            temp_data['low'] = float(data['price'])

                        temp_data['volume'] += float(data['units_traded'])
                # 시간이 달라졌을 때
                elif validPastTime is True:
                    temp_data['open'] = float(beforeData['price'])
                    temp_data['volume'] += float(data['units_traded'])

                    flag = True

                    with conn.cursor() as cursor:
                        sql = 'INSERT INTO TestApp_bithumb_btc_1m (time, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s)'

                        cursor.execute(sql, (
                            temp_data['time'], temp_data['high'], temp_data['low'], temp_data['open'],
                            temp_data['close'], temp_data['volume']))

                        conn.commit()

                    break
                # 이전 시간 데이터가 없을 때
                elif datetime.strptime(transactionTimeStr, '%Y-%m-%d %H:%M') < datetime.strptime(pastTimeStr,
                                                                                                 '%Y-%m-%d %H:%M'):
                    break
                else:
                    continue

                beforeData = data

            if flag is True:
                break

            cont_no = beforeData['cont_no']

            history = BithumbAPI.get_transaction_history(count=100, cont_no=cont_no)
    finally:
        conn.close()

    return temp_data
"""
