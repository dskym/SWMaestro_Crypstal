var botListData = [
    {
        "name": "승윤봇",
        "cryptoCurrency": "BTC",
        "exchange": "UPBIT",
        "buyStrategy": [],
        "sellStrategy": [],
        "buyStrategyThreshold": 3,
        "sellStrategyThreshold": 3,
        "tradingPeriod": 5,
        "asset": 1000000.0,
        "signalAlarm": true,
        "autoTrading": false,
        "creationTime": "2018-08-21T06:45:46.009"
    },
    {
        "name": "다솔봇",
        "cryptoCurrency": "ETH",
        "exchange": "UPBIT",
        "buyStrategy": [],
        "sellStrategy": [],
        "buyStrategyThreshold": 3,
        "sellStrategyThreshold": 3,
        "tradingPeriod": 5,
        "asset": 1000000.0,
        "signalAlarm": true,
        "autoTrading": false,
        "creationTime": "2018-08-21T06:45:46.009"
    }
];

var obj = new Array();

var buyStrategy = new Array();

var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'MACD';

strategy.indicator.options = new Object;

strategy.indicator.options.short = 12;
strategy.indicator.options.long = 26;
strategy.indicator.options.signal = 9;

strategy.indicator.options.trigger = new Object();
strategy.indicator.options.trigger.left = 'MACD';
strategy.indicator.options.trigger.comparator = '>';
strategy.indicator.options.trigger.right = 'Signal';

strategy.weight = 1;

buyStrategy.push(strategy);
obj.push(strategy);


var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'MA Double';

strategy.indicator.options = new Object;

strategy.indicator.options.shortLength = 55;
strategy.indicator.options.shortMaType = 'SMA';
strategy.indicator.options.longLength = 130;
strategy.indicator.options.longMaType = 'SMA';

strategy.indicator.options.trigger = new Object();
strategy.indicator.options.trigger.left = 'Short';
strategy.indicator.options.trigger.comparator = '>';
strategy.indicator.options.trigger.right = 'Long';

strategy.weight = 1;

buyStrategy.push(strategy);
obj.push(strategy);



var sellStrategy = new Array();

var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'Parabolic Sar';

strategy.indicator.options = new Object;

strategy.indicator.options.minAf = 0.01;
strategy.indicator.options.maxAf = 0.2;

strategy.indicator.options.trigger = new Object();
strategy.indicator.options.trigger.left = '기준 종가';
strategy.indicator.options.trigger.comparator = '>';
strategy.indicator.options.trigger.right = 'SAR';

strategy.weight = 1;

sellStrategy.push(strategy);
obj.push(strategy);


var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'Bollinger Bands';

strategy.indicator.options = new Object;

strategy.indicator.options.period = 100;
strategy.indicator.options.standardDeviations = 1.1;
strategy.indicator.options.positionIndex = 0;

strategy.indicator.options.trigger = new Object();
strategy.indicator.options.trigger.left = '기준 종가';
strategy.indicator.options.trigger.comparator = '>';
strategy.indicator.options.trigger.right = 'Position Index';

strategy.weight = 1;

sellStrategy.push(strategy);
obj.push(strategy);

botListData[0]['buyStrategy'] = buyStrategy;
botListData[0]['sellStrategy'] = sellStrategy;





//Trade Result
var tradeResult = new Object();

tradeResult.startDate = '2017-08-14 09:00:00';
tradeResult.endDate = '2017-08-14 12:00:00';
tradeResult.win = 27;
tradeResult.lose = 17;
tradeResult.maxProfit = 44.44;
tradeResult.maxLoss = -22.22;
tradeResult.revenueRate = 2500.00;
tradeResult.initialInvestmentAmount = 1000000;
tradeResult.totalAmount = 25000000;
tradeResult.profitAndLossAmount = 25000000;
tradeResult.changeRate = 35.10;
tradeResult.exchangeFee = 1000000;
tradeResult.slippageRate = 0.4;




//Trade History
var tradeHistory = new Array();

var baseDate = new Date(2018, 8, 14, 9, 0, 0);

for(var i = 0;i<20;++i) {
    var tradeHistoryObj = new Object();

    tradeHistoryObj.date = new Date(baseDate);
    baseDate.setMinutes(baseDate.getMinutes() + 5);

    if(i % 2 === 0)
        tradeHistoryObj.action = 'Buy';
    else
        tradeHistoryObj.action = 'Sell';

    tradeHistoryObj.price = 12345678;
    tradeHistoryObj.volume = 123.456;
    tradeHistoryObj.evaluation = 12345678;

    tradeHistory.push(tradeHistoryObj);
}
