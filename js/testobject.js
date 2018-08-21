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

strategy.indicator.settings = new Object;

strategy.indicator.settings.short = 12;
strategy.indicator.settings.long = 26;
strategy.indicator.settings.signal = 9;

strategy.indicator.settings.trigger = new Object();
strategy.indicator.settings.trigger.left = 'MACD';
strategy.indicator.settings.trigger.comparator = '>';
strategy.indicator.settings.trigger.right = 'Signal';

strategy.weight = 1;

buyStrategy.push(strategy);
obj.push(strategy);


var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'MA Double';

strategy.indicator.settings = new Object;

strategy.indicator.settings.shortLength = 55;
strategy.indicator.settings.shortMaType = 'SMA';
strategy.indicator.settings.longLength = 130;
strategy.indicator.settings.longMaType = 'SMA';

strategy.indicator.settings.trigger = new Object();
strategy.indicator.settings.trigger.left = 'Short';
strategy.indicator.settings.trigger.comparator = '>';
strategy.indicator.settings.trigger.right = 'Long';

strategy.weight = 1;

buyStrategy.push(strategy);
obj.push(strategy);



var sellStrategy = new Array();

var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'Parabolic Sar';

strategy.indicator.settings = new Object;

strategy.indicator.settings.minAf = 0.01;
strategy.indicator.settings.maxAf = 0.2;

strategy.indicator.settings.trigger = new Object();
strategy.indicator.settings.trigger.left = '기준 종가';
strategy.indicator.settings.trigger.comparator = '>';
strategy.indicator.settings.trigger.right = 'SAR';

strategy.weight = 1;

sellStrategy.push(strategy);
obj.push(strategy);


var strategy = new Object();

strategy.indicator = new Object();

strategy.indicator.name = 'Bollinger Bands';

strategy.indicator.settings = new Object;

strategy.indicator.settings.period = 100;
strategy.indicator.settings.standardDeviations = 1.1;
strategy.indicator.settings.positionIndex = 0;

strategy.indicator.settings.trigger = new Object();
strategy.indicator.settings.trigger.left = '기준 종가';
strategy.indicator.settings.trigger.comparator = '>';
strategy.indicator.settings.trigger.right = 'Position Index';

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
