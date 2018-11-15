import requests
import time
import math
import configparser
import json
import base64
import hashlib
import hmac
import urllib
from abc import ABC, abstractmethod

class Machine(ABC):
    @abstractmethod
    def get_filled_orders(self):
        pass

    @abstractmethod
    def get_ticker(self):
        pass

    @abstractmethod
    def get_wallet_status(self):
        pass

    @abstractmethod
    def get_token(self):
        pass

    @abstractmethod
    def set_token(self):
        pass

    @abstractmethod
    def get_username(self):
        pass

    @abstractmethod
    def buy_order(self):
        pass

    @abstractmethod
    def sell_order(self):
        pass

    @abstractmethod
    def cancel_order(self):
        pass

    @abstractmethod
    def get_my_order_status(self):
        pass

class BithumbMachine(Machine):
    BASE_API_URL = "https://api.bithumb.com"
    TRADE_CURRENCY_TYPE = ["BTC", "ETH", "DASH", "LTC", "ETC", "XRP", "BCH", "XMR", "ZEC", "QTUM", "BTG", "EOS"]

    def __init__(self):
        config = configparser.ConfigParser()
        config.read('config.ini')

        self.CLIENT_ID = config['BITHUMB']['CONNECT_KEY']
        self.CLIENT_SECRET = config['BITHUMB']['SECRET_KEY']
        self.USER_NAME = config['BITHUMB']['USERNAME']
#        self.CLIENT_ID = 'dcb1ee47fea17e86b29f85b413dbeb4c'
#        self.CLIENT_SECRET = '10c692fce45b32004dc1cca0a6f4e6c'
#        self.USER_NAME = 'dd_sol@khu.ac.kr'
        #self.access_token = None
        #self.refresh_token = None
        #self.token_type = None
         
    def get_username(self):
        return self.USER_NAME

    def get_token(self):
        pass
        
    def set_token(self):
        pass
        
    def get_nonce(self):
        return self.usecTime()#str(int(time.time()))

    def get_ticker(self, currency_type=None):
        if currency_type is None:
            raise Exception('Need to currency type')
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        ticker_api_path = "/public/ticker/{currency}".format(currency=currency_type)
        url_path = self.BASE_API_URL + ticker_api_path
        res = requests.get(url_path)
        response_json = res.json()
        result={}
        result["timestamp"] = str(response_json['data']["date"])
        result["last"] = response_json['data']["closing_price"]
        result["bid"] = response_json['data']["buy_price"]
        result["ask"] = response_json['data']["sell_price"]
        result["high"] = response_json['data']["max_price"]
        result["low"] = response_json['data']["min_price"]
        result["volume"] = response_json['data']["volume_1day"]
        return result

    def get_filled_orders(self, currency_type=None):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        params = {'offset':0,'count':100}
        orders_api_path = "/public/recent_transactions/{currency}".format(currency=currency_type)

        url_path = self.BASE_API_URL + orders_api_path
        res = requests.get(url_path, params=params)
        result = res.json()
        return result

    def microtime(self, get_as_float = False):
        if get_as_float:
            return time.time()
        else:
            return '%f %d' % math.modf(time.time())

    def usecTime(self) :
        mt = self.microtime(False)
        mt_array = mt.split(" ")[:2]
        return mt_array[1] + mt_array[0][2:5]
   
    def get_signature(self, encoded_payload, secret_key):
        signature = hmac.new(secret_key, encoded_payload, hashlib.sha512);
        api_sign = base64.b64encode(signature.hexdigest().encode('utf-8'))
        return api_sign
    
    def get_wallet_status(self, currency_type=None):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        endpoint ="/info/balance"
        url_path = self.BASE_API_URL + endpoint
        
        endpoint_item_array = {
             "endpoint" : endpoint,
             "currency" : currency_type 
        }
        
        uri_array = dict(endpoint_item_array) # Concatenate the two arrays.
        str_data = urllib.parse.urlencode(uri_array)
        nonce = self.get_nonce()
        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')
        
        key = self.CLIENT_SECRET
        utf8_key = key.encode('utf-8')
       
        headers = {'Content-Type': 'application/x-www-form-urlencoded',
                   'Api-Key':self.CLIENT_ID,
                   'Api-Sign':self.get_signature(utf8_data,bytes(utf8_key)),
                   'Api-Nonce':nonce}

        res = requests.post(url_path, headers=headers, data=str_data)
        result = res.json()
        return result["data"] 

    def get_list_my_orders(self, currency_type=None):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type')

        time.sleep(1)
        endpoint ="/info/orders"
        url_path = self.BASE_API_URL + endpoint

        endpoint_item_array = {
             "endpoint" : endpoint,
             "currency" : currency_type
        }
        
        uri_array = dict(endpoint_item_array)# Concatenate the two arrays.
        str_data = urllib.parse.urlencode(uri_array)
        nonce = self.get_nonce()
        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')
        
        key = self.CLIENT_SECRET
        utf8_key = key.encode('utf-8')
       
        headers = {'Content-Type': 'application/x-www-form-urlencoded',
                   'Api-Key':self.CLIENT_ID,
                   'Api-Sign':self.get_signature(utf8_data,bytes(utf8_key)),
                   'Api-Nonce':nonce}

        res = requests.post(url_path, headers=headers, data=str_data)
        result = res.json()
        print(result)
        return result
#        return result["data"]

    def get_my_order_status(self, currency_type=None, order_id=None):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        endpoint ="/info/order_detail"
        url_path = self.BASE_API_URL + endpoint
        
        endpoint_item_array = {
             "endpoint" : endpoint,
             "currency" : currency_type
        }
        
        uri_array = dict(endpoint_item_array) # Concatenate the two arrays.
        str_data = urllib.parse.urlencode(uri_array)
        nonce = self.get_nonce()
        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')
        
        key = self.CLIENT_SECRET
        utf8_key = key.encode('utf-8')
       
        headers = {'Content-Type': 'application/x-www-form-urlencoded',
                   'Api-Key':self.CLIENT_ID,
                   'Api-Sign':self.get_signature(utf8_data,bytes(utf8_key)),
                   'Api-Nonce':nonce}

        res = requests.post(url_path, headers=headers, data=str_data)
        result = res.json()
        return result["data"] 

    def buy_order(self, currency_type=None, price=None, qty=None, order_type="limit"):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        endpoint ="/trade/place"
        url_path = self.BASE_API_URL + endpoint
        
        endpoint_item_array = {
             "endpoint" : endpoint,
             "order_currency" : currency_type,
             "payment_currenct" : "KRW",
             "units" : qty,
             "price" : price,
             "type" : "bid"
        }
        
        uri_array = dict(endpoint_item_array) # Concatenate the two arrays.
        str_data = urllib.parse.urlencode(uri_array)
        nonce = self.get_nonce()
        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')
        
        key = self.CLIENT_SECRET
        utf8_key = key.encode('utf-8')
       
        headers = {'Content-Type': 'application/x-www-form-urlencoded',
                   'Api-Key':self.CLIENT_ID,
                   'Api-Sign':self.get_signature(utf8_data,bytes(utf8_key)),
                   'Api-Nonce':nonce}

        res = requests.post(url_path, headers=headers, data=str_data)
        result = res.json()
        return result 

    def sell_order(self, currency_type=None, price=None, qty=None, order_type="limit"):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        endpoint ="/trade/place"
        url_path = self.BASE_API_URL + endpoint
        
        endpoint_item_array = {
             "endpoint" : endpoint,
             "order_currency" : currency_type,
             "payment_currenct" : "KRW",
             "units" : qty,
             "price" : price,
             "type" : "ask"
        }
        
        uri_array = dict(endpoint_item_array) # Concatenate the two arrays.
        str_data = urllib.parse.urlencode(uri_array)
        nonce = self.get_nonce()
        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')
        
        key = self.CLIENT_SECRET
        utf8_key = key.encode('utf-8')
       
        headers = {'Content-Type': 'application/x-www-form-urlencoded',
                   'Api-Key':self.CLIENT_ID,
                   'Api-Sign':self.get_signature(utf8_data,bytes(utf8_key)),
                   'Api-Nonce':nonce}

        res = requests.post(url_path, headers=headers, data=str_data)
        result = res.json()
        return result

    def cancel_order(self, currency_type=None, order_type=None, order_id=None):
        if currency_type is None:
            raise Exception("Need to currency_type")
        if currency_type not in self.TRADE_CURRENCY_TYPE:
            raise Exception('Not support currency type') 
        time.sleep(1)
        endpoint ="/trade/cancel"
        url_path = self.BASE_API_URL + endpoint
        
        endpoint_item_array = {
             "endpoint" : endpoint,
             "currency" : currency_type,
             "type" : order_type,
             "order_id" : order_id
        }
        
        uri_array = dict(endpoint_item_array) # Concatenate the two arrays.
        str_data = urllib.parse.urlencode(uri_array)
        nonce = self.get_nonce()
        data = endpoint + chr(0) + str_data + chr(0) + nonce
        utf8_data = data.encode('utf-8')
        
        key = self.CLIENT_SECRET
        utf8_key = key.encode('utf-8')
       
        headers = {'Content-Type': 'application/x-www-form-urlencoded',
                   'Api-Key':self.CLIENT_ID,
                   'Api-Sign':self.get_signature(utf8_data,bytes(utf8_key)),
                   'Api-Nonce':nonce}

        res = requests.post(url_path, headers=headers, data=str_data)
        result = res.json()
        return result
        
    def __repr__(self):
        return "(Bithumb %s)"%self.USER_NAME

    def __str__(self):
        return str("Bithumb")
