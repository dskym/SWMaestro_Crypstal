import requests
import time
import math
import base64
import hmac
import hashlib
import urllib.parse
import json
from datetime import datetime


api_key = "5709ca4841ba8059e7246b55b8358a37"
api_secret = "5105ce0f3360623c6ce8c6f8f6212cff"


class XCoinAPI:
    api_url = "https://api.bithumb.com"
    api_key = "5709ca4841ba8059e7246b55b8358a37"
    api_secret = "5105ce0f3360623c6ce8c6f8f6212cff"

    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret

    def microtime(self, get_as_float=False):
        if get_as_float:
            return time.time()
        else:
            return '%f %d' % math.modf(time.time())

    def usecTime(self):
        mt = self.microtime(False)
        mt_array = mt.split(" ")[:2]
        return mt_array[1] + mt_array[0][2 :5]

    def xcoinApiCall(self, endpoint, params):
        endpoint_item_array = {
            "endpoint": endpoint
        }

        uri_array = dict(endpoint_item_array, **params)  # Concatenate the two arrays.

        str_data = urllib.parse.urlencode(uri_array)

        nonce = self.usecTime()

        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')

        key = self.api_secret
        utf8_key = key.encode('utf-8')

        h = hmac.new(bytes(utf8_key), utf8_data, hashlib.sha512)
        hex_output = h.hexdigest()
        utf8_hex_output = hex_output.encode('utf-8')

        api_sign = base64.b64encode(utf8_hex_output)
        utf8_api_sign = api_sign.decode('utf-8')

        url = self.api_url + endpoint

        headers = {
            'Api-Key': self.api_key,
            'Api-Sign': utf8_api_sign,
            'Api-Nonce': nonce,
            'Content-Type': 'application/x-www-form-urlencoded; charset:utf-8'
        }

        response = requests.post(url, data=str_data, headers=headers)

        return json.loads(response.content.decode())


def market_buy(order_currency, units, price, payment_currency='KRW'):
    api = XCoinAPI(api_key, api_secret)

    params = {
        'order_currency': order_currency,
        'payment_currency': payment_currency,
        'units': units,
        'price': price,
        'type': 'bid',
    }

    result = api.xcoinApiCall("/trade/place", params)

    return result


def market_sell(order_currency, units, price, payment_currency='KRW'):
    api = XCoinAPI(api_key, api_secret)

    params = {
        'order_currency': order_currency,
        'payment_currency': payment_currency,
        'units': units,
        'price': price,
        'type': 'ask',
    }

    result = api.xcoinApiCall("/trade/place", params)

    return result


def get_transaction_history(count=None, cont_no=None, currency='BTC'):
    endpoint = '/public/transaction_history/' + currency

    url = api_url + endpoint

    params = {}

    if count is not None:
        params['count'] = count

    if cont_no is not None:
        params['cont_no'] = cont_no

    response = requests.get(url, params=params)

    return json.loads(response.content.decode())


def get_order_information(order_id, type, currency='BTC'):
    api = XCoinAPI(api_key, api_secret)

    params = {
        'order_id': order_id,
        'type': type
    }

    result = api.xcoinApiCall("/info/orders", params)

    return result


def get_order_detail(order_id, type, currency='BTC'):
    api = XCoinAPI(api_key, api_secret)

    params = {
        'currency': currency,
        'order_id': order_id,
        'type': type
    }

    result = api.xcoinApiCall("/info/order_detail", params)

    return result


def get_user_transactions(currency='BTC'):
    api = XCoinAPI(api_key, api_secret)

    params = {
        'currency': currency,
    }

    result = api.xcoinApiCall("/info/user_transactions", params)

    return result


def get_coin_data():
    history = get_transaction_history(count=100)
    pivotDate = datetime.strptime('2018-11-01 18:50:00', '%Y-%m-%d %H:%M:%S')

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

    while True:
        flag = False

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

                coin_data.insert(0, temp_data.copy())

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

        history = get_transaction_history(count=100, cont_no=cont_no)

    return coin_data[:-1]