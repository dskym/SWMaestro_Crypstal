var baseUrl = 'http://crypstal.ap-northeast-2.elasticbeanstalk.com/v1';

var botListUrl = baseUrl + '/bots';
var ruleUrl = baseUrl + '/rules';
var chartUrl = baseUrl + '/chart/candles/minutes/5?exchange=upbit&market=krw-btc&to=2018-08-31&count=1000';
var webTickerUrl = baseUrl + '/ticker?baseCurrency=KRW';

//var serverUrl = 'http://127.0.0.1:8000';
var serverUrl = 'http://35.189.155.121:8000';
var webSocketServerUrl = 'ws://127.0.0.1:8000';
//var webSocketServerUrl = 'ws://35.189.155.121:8000';