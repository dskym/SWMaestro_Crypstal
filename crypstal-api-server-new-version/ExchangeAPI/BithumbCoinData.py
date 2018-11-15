import BithumbAPI
from datetime import datetime, timedelta
import pymysql.cursors
from pytz import timezone

conn = pymysql.connect(host='35.201.207.75',
                       user='root',
                       password='crypstal-pw',
                       db='crypstal')


def bithumb_btc_1m():
    history = BithumbAPI.get_transaction_history(count=100, cont_no=30475394)
    pivotDate = datetime.strptime('2018-07-01 00:00:00', '%Y-%m-%d %H:%M:%S')

    coin_data = []

    temp_data = {
        'time': '',
        'open': 0.0,
        'high': 0.0,
        'low': 0.0,
        'close': 0.0,
        'volume': 0.0,
    }

    beforeData = None

    try:
        while True:
            flag = False

            history['data'].sort(key=lambda v: v['transaction_date'], reverse=True)

            for index, data in enumerate(history['data']):
                if beforeData is None:
                    beforeData = data

                    continue

                beforeTime = datetime.strptime(beforeData['transaction_date'], '%Y-%m-%d %H:%M:%S').strftime(
                    '%Y-%m-%d %H:%M')

                currentTime = datetime.strptime(data['transaction_date'], '%Y-%m-%d %H:%M:%S').strftime(
                    '%Y-%m-%d %H:%M')

                if currentTime == beforeTime:
                    if float(data['price']) > temp_data['high']:
                        temp_data['high'] = float(data['price'])

                    if float(data['price']) < temp_data['low']:
                        temp_data['low'] = float(data['price'])

                    temp_data['volume'] += float(data['units_traded'])
                else:
                    temp_data['volume'] += float(beforeData['units_traded'])
                    temp_data['open'] = float(beforeData['price'])

                    if temp_data['time'] != '':
                        with conn.cursor() as cursor:
                            sql = 'INSERT INTO TestApp_bithumb_btc_1m (time, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s)'

                            cursor.execute(sql, (
                                temp_data['time'], temp_data['high'], temp_data['low'], temp_data['open'],
                                temp_data['close'], temp_data['volume']))

                            conn.commit()

                    temp_data['time'] = currentTime
                    temp_data['open'] = float(data['price'])
                    temp_data['close'] = float(data['price'])
                    temp_data['high'] = float(data['price'])
                    temp_data['low'] = float(data['price'])
                    temp_data['volume'] = float(data['units_traded'])

                if pivotDate > datetime.strptime(data['transaction_date'], '%Y-%m-%d %H:%M:%S'):
                    flag = True
                    break

                beforeData = data

            if flag is True:
                break

            cont_no = beforeData['cont_no']

            history = BithumbAPI.get_transaction_history(count=100, cont_no=cont_no)

    finally:
        conn.close()


def bithumb_btc_1h():
    try:
        with conn.cursor() as cursor:
            sql = "select * from TestApp_bithumb_btc_1m order by time asc"
            cursor.execute(sql)

            rows = cursor.fetchall()

            dataList = []
            interval = timedelta(hours=1)
            pivotDate = datetime.strptime('2018-01-01 00:00:00', '%Y-%m-%d %H:%M:%S') + interval

            data = {
                'time': pivotDate,
                'open': 0,
                'high': 0,
                'low': 0,
                'close': 0,
                'volume': 0,
            }

            beforeRow = None

            for row in rows:
                dataTime = datetime.strptime(row[0].strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')

                if pivotDate < dataTime:
                    pivotDate = pivotDate + interval

                    if pivotDate == dataTime:
                        data['close'] = beforeRow[4]

                    dataList.append(data.copy())

                    data['time'] = pivotDate
                    data['open'] = float(row[3])
                    data['close'] = float(row[4])
                    data['high'] = float(row[1])
                    data['low'] = float(row[2])
                    data['volume'] = float(row[5])
                else:
                    if data['high'] < row[1]:
                        data['high'] = row[1]

                    if data['low'] > row[2]:
                        data['low'] = row[2]

                    data['volume'] += row[5]

                beforeRow = row

            for c in dataList:
                sql = 'INSERT INTO TestApp_bithumb_btc_1h (time, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s)'

                cursor.execute(sql, (
                    c['time'], c['high'], c['low'], c['open'],
                    c['close'], c['volume']))

                conn.commit()
    finally:
        conn.close()


def bithumb_btc_1d():
    try:
        with conn.cursor() as cursor:
            sql = "select * from TestApp_bithumb_btc_1h order by time asc"
            cursor.execute(sql)

            rows = cursor.fetchall()

            dataList = []
            interval = timedelta(days=1)
            pivotDate = datetime.strptime('2018-01-01 00:00:00', '%Y-%m-%d %H:%M:%S') + interval

            data = {
                'time': pivotDate,
                'open': 0,
                'high': 0,
                'low': 0,
                'close': 0,
                'volume': 0,
            }

            beforeRow = None

            for row in rows:
                dataTime = datetime.strptime(row[0].strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')

                if pivotDate <= dataTime:
                    pivotDate = pivotDate + interval

                    if pivotDate == dataTime:
                        data['close'] = beforeRow[4]

                    dataList.append(data.copy())

                    data['time'] = pivotDate
                    data['open'] = float(row[3])
                    data['close'] = float(row[4])
                    data['high'] = float(row[1])
                    data['low'] = float(row[2])
                    data['volume'] = float(row[5])
                else:
                    if data['high'] < row[1]:
                        data['high'] = row[1]

                    if data['low'] > row[2]:
                        data['low'] = row[2]

                    data['volume'] += row[5]

                beforeRow = row

            for c in dataList:
                sql = 'INSERT INTO TestApp_bithumb_btc_1d (time, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s)'

                cursor.execute(sql, (
                    c['time'], c['high'], c['low'], c['open'],
                    c['close'], c['volume']))

                conn.commit()
    finally:
        conn.close()
