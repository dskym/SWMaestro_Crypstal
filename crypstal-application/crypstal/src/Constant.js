const baseUrl = 'http://http://crypstal.ap-northeast-2.elasticbeanstalk.com';

const botListUrl = baseUrl + '/v1/bots';

const strategyUrl = baseUrl + '/v1/rules';
//const strategyUrl = baseUrl + '/v1/strategies';

const chartUrl = baseUrl + '/v1/chart/candles/minutes/5?exchange=upbit&market=krw-btc&to=2018-08-31&count=200';

const webTickerUrl = baseUrl + '/v1/ticker?baseCurrency=KRW';

export default webTickerUrl;